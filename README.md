# CWG AI Ordering Website (Demo)

A Next.js + TypeScript + Tailwind demo for **Custom Werks Graphics** that turns a brochure-style website into an AI-powered lead capture and order intake workflow.

## Features
- Multi-page CWG-inspired marketing site
- Prominent AI assistant on every page
- Required contact capture (name, email, phone) before detailed intake
- Project routing: Screen Printing, Embroidery, Ad Specialty / Promotional Item
- Structured order summary + missing info checklist + pricing guidance disclaimer
- Internal sales note + customer confirmation output
- Lead send route with Resend + fallback demo preview mode

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## AI configuration
Set:
```bash
OPENAI_API_KEY=your_key_here
```
If missing, the app runs in **Demo Mode** with realistic local fallback responses.

## Email lead delivery configuration
Set:
```bash
RESEND_API_KEY=your_resend_key_here
```
If missing, email send route stays in **Demo Mode** and returns a full preview.

Lead recipients:
- brandonwesleycarter@gmail.com
- rod@customwerks.net

## Vercel deployment
1. Push repo to GitHub.
2. Import project in Vercel.
3. Add `OPENAI_API_KEY` and optional `RESEND_API_KEY`.
4. Deploy.

## Future integration ideas
- Send leads into Google Sheets
- Connect CRM / Antera
- Connect artwork upload workflow
- Add webhook-based sales routing
- Persist leads in database
- Trigger sales notifications automatically
