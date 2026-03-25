# Smart Contract Analyzer

AI-powered contract analysis app built with React + Express and backed by Google Gemini.

## What this project does

- Upload a contract and parse document text/structure
- Run AI analysis to extract:
  - Contract type
  - Parties
  - Financial terms
  - Important dates
  - Risk assessment
  - Key terms and obligations
- Show results in a clean, tabbed UI

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind, shadcn/ui
- Backend: Express, Multer
- AI: Google Gemini API

## Requirements

- Node.js 18+
- npm
- A Gemini API key with active quota

## Environment setup

1. Copy env template:

```bash
cp .env.example .env
```

2. Edit `.env` and set your key:

```env
GEMINI_API_KEY=your_real_api_key
GEMINI_MODEL=gemini-2.5-flash
GEMINI_FALLBACK_MODELS=gemini-2.5-flash-lite,gemini-3.1-flash-lite,gemini-3-flash
```

## Run locally

```bash
npm install
npm run dev
```

App URL:

- `http://localhost:8000`

Default landing route:

- `/` redirects to `/contract-analyzer`

Other route:

- `/home` (optional demo page)

## Verify API/key quickly

```bash
curl -s http://localhost:8000/api/health
```

Expected fields:

- `status: "ok"`
- `geminiApiConfigured: true`
- `model` and `fallbackModels`

If `geminiApiConfigured` is `false`, check your `.env` and restart the dev server.

## Common issues

### 1) `Missing GEMINI_API_KEY`

- `.env` missing key, typo in variable name, or server not restarted.

### 2) Quota/rate-limit errors

- API key is valid but project has no usable quota for selected model.
- Use a key/project with billing/quota enabled.
- Keep fallback models configured in `.env`.

### 3) JSON parsing fallback in analysis

- Handled by server JSON mode + parsed response fallback.
- If a very large contract still fails, retry or reduce input size.

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # run production bundle
npm run check    # TypeScript check
```

## Notes

- `.env` is ignored by git.
- Do not commit API keys.
