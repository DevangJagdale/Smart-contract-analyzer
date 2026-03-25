import express from "express";
import cors from "cors";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";

const app = express();
const upload = multer();
const PORT = 4000;

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";

app.use(cors());

app.post("/api/parse-document", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const formData = new FormData();
    formData.append("document", req.file.buffer, req.file.originalname);
    formData.append("output_formats", JSON.stringify(["html", "text"]));
    formData.append("ocr", "auto");
    formData.append("coordinates", "true");
    formData.append("model", "document-parse");

    const response = await fetch("https://api.upstage.ai/v1/document-digitization", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
