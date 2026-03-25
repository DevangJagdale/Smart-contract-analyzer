import express from "express";
import cors from "cors";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";

const app = express();
const PORT = process.env.PORT || 8000;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://upstage-ai.onrender.com' 
    : ['http://localhost:3000', 'http://localhost:8000', 'http://127.0.0.1:8000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
console.log("Upstage API Key configured:", apiKey ? "✓" : "✗");

// Document Parse endpoint
app.post("/api/document-parse", upload.single('document'), async (req, res) => {
  try {
    console.log("Document parse request received");
    
    if (!req.file) {
      console.log("No file provided");
      return res.status(400).json({ error: "No document file provided" });
    }

    console.log("File details:", {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });

    // Create FormData for the API request
    const formData = new FormData();
    formData.append('document', req.file.buffer, {
      filename: req.file.originalname || 'document',
      contentType: req.file.mimetype
    });
    formData.append('model', 'document-parse');
    formData.append('output_formats', JSON.stringify(["html", "markdown", "text"]));

    console.log("Making request to Upstage API...");
    
    const response = await fetch('https://api.upstage.ai/v1/document-digitization', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });

    console.log("Upstage API response status:", response.status);

    // Log raw response body for debugging
    const responseBody = await response.text();
    console.log("Upstage API raw response:", responseBody);

    if (!response.ok) {
      console.error("Upstage API error:", response.status, responseBody);
      return res.status(response.status).json({ 
        error: "Upstage API request failed", 
        details: responseBody || "No response body"
      });
    }

    // Attempt to parse JSON
    let result;
    try {
      result = JSON.parse(responseBody);
    } catch (parseError) {
      console.error("Failed to parse Upstage API response as JSON:", parseError);
      return res.status(500).json({ 
        error: "Invalid response from Upstage API", 
        details: "Response is not valid JSON: " + responseBody
      });
    }

    console.log("Document parse successful, elements count:", result.elements?.length || 0);
    res.json(result);
  } catch (error) {
    console.error("Document parse error:", error);
    res.status(500).json({ 
      error: "Failed to parse document", 
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Information Extract endpoint
app.post("/api/information-extract", upload.single('document'), async (req, res) => {
  try {
    console.log("Information extract request received");
    
    if (!req.file) {
      return res.status(400).json({ error: "No document file provided" });
    }

    const { schema } = req.body;
    
    if (!schema) {
      return res.status(400).json({ error: "No schema provided" });
    }

    console.log("File details:", {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });

    // Convert file to base64 using Node.js Buffer
    const base64Data = req.file.buffer.toString('base64');
    
    const requestBody = {
      model: 'information-extract',
      messages: [{
        role: 'user',
        content: [{
          type: 'image_url',
          image_url: {
            url: `data:${req.file.mimetype};base64,${base64Data}`
          }
        }]
      }],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'extraction_schema',
          schema: JSON.parse(schema)
        }
      }
    };

    console.log("Making request to Upstage Information Extract API...");

    const response = await fetch('https://api.upstage.ai/v1/information-extraction/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log("Upstage API response status:", response.status);

    // Log raw response body for debugging
    const responseBody = await response.text();
    console.log("Upstage API raw response:", responseBody);

    if (!response.ok) {
      console.error("Upstage API error:", response.status, responseBody);
      return res.status(response.status).json({ 
        error: "Upstage API request failed", 
        details: responseBody || "No response body"
      });
    }

    // Attempt to parse JSON
    let result;
    try {
      result = JSON.parse(responseBody);
    } catch (parseError) {
      console.error("Failed to parse Upstage API response as JSON:", parseError);
      return res.status(500).json({ 
        error: "Invalid response from Upstage API", 
        details: "Response is not valid JSON: " + responseBody
      });
    }

    console.log("Information extract successful");
    res.json(result);
  } catch (error) {
    console.error("Information extract error:", error);
    res.status(500).json({ 
      error: "Failed to extract information", 
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Solar LLM Chat endpoint
app.post("/api/solar-chat", async (req, res) => {
  try {
    console.log("Solar LLM chat request received");
    
    const { messages, reasoningEffort = 'medium', stream = false } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    console.log("Messages count:", messages.length);
    console.log("Reasoning effort:", reasoningEffort);

    const requestBody = {
      model: 'solar-pro2-preview',
      messages: messages,
      reasoning_effort: reasoningEffort,
      stream: stream,
      temperature: 0.1,
      max_tokens: 4000
    };

    console.log("Making request to Upstage Solar LLM API...");

    const response = await fetch('https://api.upstage.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log("Upstage API response status:", response.status);

    // Log raw response body for debugging
    const responseBody = await response.text();
    console.log("Upstage API raw response:", responseBody);

    if (!response.ok) {
      console.error("Upstage API error:", response.status, responseBody);
      return res.status(response.status).json({ 
        error: "Upstage API request failed", 
        details: responseBody || "No response body"
      });
    }

    // Attempt to parse JSON
    let result;
    try {
      result = JSON.parse(responseBody);
    } catch (parseError) {
      console.error("Failed to parse Upstage API response as JSON:", parseError);
      return res.status(500).json({ 
        error: "Invalid response from Upstage API", 
        details: "Response is not valid JSON: " + responseBody
      });
    }

    console.log("Solar LLM chat successful");
    res.json(result);
  } catch (error) {
    console.error("Solar LLM chat error:", error);
    res.status(500).json({ 
      error: "Failed to chat with Solar LLM", 
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    upstageApiConfigured: !!apiKey,
    apiKey: apiKey ? `${apiKey.substring(0, 8)}...` : "not configured",
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});