import type { Express } from "express";
import { createServer, type Server } from "http";
import cors from "cors";
import multer from "multer";
import fetch from "node-fetch";
import express from "express";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content:
    | string
    | Array<{
        type: "text" | "image_url";
        text?: string;
        image_url?: {
          url: string;
        };
      }>;
};

type GeminiPart =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } };

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_FALLBACK_MODELS = (process.env.GEMINI_FALLBACK_MODELS || "gemini-2.5-flash-lite,gemini-3.1-flash-lite,gemini-3-flash")
  .split(",")
  .map((model) => model.trim())
  .filter(Boolean);

function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
}

function extractJsonFromText(text: string): any {
  const cleaned = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const objectMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      return JSON.parse(objectMatch[0]);
    }

    const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      return JSON.parse(arrayMatch[0]);
    }
  }

  return null;
}

function dataUrlToInlineData(dataUrl: string): { mimeType: string; data: string } | null {
  const match = dataUrl.match(/^data:(.*?);base64,(.*)$/);
  if (!match) {
    return null;
  }

  return {
    mimeType: match[1] || "application/octet-stream",
    data: match[2],
  };
}

function mapOpenAIToGemini(messages: ChatMessage[]) {
  const systemMessages: string[] = [];
  const contents: Array<{ role: "user" | "model"; parts: GeminiPart[] }> = [];

  for (const message of messages) {
    if (message.role === "system") {
      if (typeof message.content === "string" && message.content.trim()) {
        systemMessages.push(message.content.trim());
      }
      continue;
    }

    const parts: GeminiPart[] = [];

    if (typeof message.content === "string") {
      parts.push({ text: message.content });
    } else {
      for (const part of message.content) {
        if (part.type === "text" && part.text) {
          parts.push({ text: part.text });
        }
        if (part.type === "image_url" && part.image_url?.url) {
          const inlineData = dataUrlToInlineData(part.image_url.url);
          if (inlineData) {
            parts.push({ inlineData });
          }
        }
      }
    }

    if (parts.length > 0) {
      contents.push({
        role: message.role === "assistant" ? "model" : "user",
        parts,
      });
    }
  }

  return {
    systemInstruction: systemMessages.join("\n\n").trim() || undefined,
    contents,
  };
}

async function callGemini(options: {
  contents: Array<{ role: "user" | "model"; parts: GeminiPart[] }>;
  systemInstruction?: string;
  temperature?: number;
  responseMimeType?: "application/json" | "text/plain";
  maxOutputTokens?: number;
}) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY)");
  }

  const modelsToTry = [GEMINI_MODEL, ...GEMINI_FALLBACK_MODELS.filter((model) => model !== GEMINI_MODEL)];
  const failureMessages: string[] = [];

  for (const model of modelsToTry) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: options.contents,
          systemInstruction: options.systemInstruction
            ? {
                parts: [{ text: options.systemInstruction }],
              }
            : undefined,
          generationConfig: {
            temperature: options.temperature ?? 0.2,
            responseMimeType: options.responseMimeType,
            maxOutputTokens: options.maxOutputTokens,
          },
        }),
      },
    );

    const rawBody = await response.text();
    let data: any = {};
    try {
      data = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      data = {};
    }

    if (response.ok) {
      const text =
        data?.candidates?.[0]?.content?.parts
          ?.map((part: { text?: string }) => part.text || "")
          .join("\n")
          .trim() || "";

      return {
        text,
        usageMetadata: data?.usageMetadata,
        raw: data,
      };
    }

    const message = data?.error?.message || rawBody || `Gemini request failed with ${response.status}`;
    failureMessages.push(`${model}: ${message}`);

    const isQuotaError = /quota|rate limit|RESOURCE_EXHAUSTED|free_tier/i.test(message);
    if (!isQuotaError) {
      throw new Error(message);
    }
  }

  throw new Error(
    `Gemini quota exceeded for all configured models. ` +
      `Enable billing or use a key/project with quota. Tried: ${modelsToTry.join(", ")}. ` +
      `Details: ${failureMessages.join(" | ")}`,
  );
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? true
          : ["http://localhost:3000", "http://localhost:8000", "http://127.0.0.1:8000"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(express.json());

  // Document Parse endpoint
  app.post("/api/document-parse", upload.single("document"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No document file provided" });
      }

      const parsePrompt = `You are a document parser.
Extract the document content and return ONLY valid JSON with this exact structure:
{
  "html": "HTML representation of the content",
  "markdown": "Markdown representation of the content",
  "text": "Plain text representation of the content"
}
If you cannot produce html/markdown faithfully, still return best-effort values.`;

      const geminiResult = await callGemini({
        systemInstruction: "Return strict JSON only.",
        contents: [
          {
            role: "user",
            parts: [
              { text: parsePrompt },
              {
                inlineData: {
                  mimeType: req.file.mimetype || "application/octet-stream",
                  data: req.file.buffer.toString("base64"),
                },
              },
            ],
          },
        ],
      });

      const parsed = extractJsonFromText(geminiResult.text);
      const text = parsed?.text || geminiResult.text || "";
      const markdown = parsed?.markdown || text;
      const html = parsed?.html || `<pre>${text.replace(/[&<>]/g, (char: string) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char] as string))}</pre>`;

      return res.json({
        elements: [
          {
            category: "document",
            content: {
              html,
              markdown,
              text,
            },
            id: 0,
            page: 1,
          },
        ],
      });
    } catch (error) {
      return res.status(500).json({
        error: "Failed to parse document",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Information Extract endpoint
  app.post("/api/information-extract", upload.single("document"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No document file provided" });
      }

      const { schema } = req.body;
      if (!schema) {
        return res.status(400).json({ error: "No schema provided" });
      }

      const schemaObject = typeof schema === "string" ? JSON.parse(schema) : schema;

      const extractionPrompt = `Extract structured information from this document.
Return ONLY valid JSON matching this JSON schema:
${JSON.stringify(schemaObject, null, 2)}

Rules:
- Do not add explanations.
- Do not wrap with markdown fences.
- If a field is missing, use null or an empty array/object as appropriate.`;

      const geminiResult = await callGemini({
        systemInstruction: "You are a precise data extraction assistant. Return strict JSON only.",
        contents: [
          {
            role: "user",
            parts: [
              { text: extractionPrompt },
              {
                inlineData: {
                  mimeType: req.file.mimetype || "application/octet-stream",
                  data: req.file.buffer.toString("base64"),
                },
              },
            ],
          },
        ],
      });

      const extracted = extractJsonFromText(geminiResult.text);
      const content = extracted ? JSON.stringify(extracted) : geminiResult.text;

      return res.json({
        choices: [
          {
            message: {
              role: "assistant",
              content,
            },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: geminiResult.usageMetadata?.promptTokenCount || 0,
          completion_tokens: geminiResult.usageMetadata?.candidatesTokenCount || 0,
          total_tokens: geminiResult.usageMetadata?.totalTokenCount || 0,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: "Failed to extract information",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Chat endpoint (kept as /api/solar-chat for frontend compatibility)
  app.post("/api/solar-chat", async (req, res) => {
    try {
      const { messages, responseFormat } = req.body as {
        messages: ChatMessage[];
        reasoningEffort?: string;
        stream?: boolean;
        responseFormat?: "json" | "text";
      };

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages format" });
      }

      const mapped = mapOpenAIToGemini(messages);
      if (mapped.contents.length === 0) {
        return res.status(400).json({ error: "No valid message content provided" });
      }

      const geminiResult = await callGemini({
        contents: mapped.contents,
        systemInstruction: mapped.systemInstruction,
        temperature: 0.2,
        responseMimeType: responseFormat === "json" ? "application/json" : "text/plain",
        maxOutputTokens: responseFormat === "json" ? 8192 : 4096,
      });

      const parsed = responseFormat === "json" ? extractJsonFromText(geminiResult.text) : null;

      return res.json({
        choices: [
          {
            message: {
              role: "assistant",
              content: geminiResult.text,
            },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: geminiResult.usageMetadata?.promptTokenCount || 0,
          completion_tokens: geminiResult.usageMetadata?.candidatesTokenCount || 0,
          total_tokens: geminiResult.usageMetadata?.totalTokenCount || 0,
        },
        parsed,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Failed to chat with Gemini",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  app.get("/api/health", (_req, res) => {
    const apiKey = getGeminiApiKey();
    res.json({
      status: "ok",
      geminiApiConfigured: !!apiKey,
      apiKey: apiKey ? `${apiKey.substring(0, 8)}...` : "not configured",
      model: GEMINI_MODEL,
      fallbackModels: GEMINI_FALLBACK_MODELS,
      timestamp: new Date().toISOString(),
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
