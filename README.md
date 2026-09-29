# PhysicsMentor-NG

AI-powered CRAL lesson note generator for Nigerian Senior Secondary School physics teachers.
Operationalises the CRAL Model (Hemba, Nanpon & Gyitbe, 2026) — Asian Journal of Research and Reviews in Physics, Vol. 10(4), 109–115.

**T_CEIPEC · Federal University of Education, Pankshin**

## Deploy to Vercel
1. Push this repo to GitHub
2. Import on Vercel → add environment variable: `GROQ_API_KEY` = your Groq key
3. Deploy — no other config needed

## Run locally
```bash
cp .env.local.example .env.local
# Add your GROQ_API_KEY to .env.local
npm install && npm run dev
```
