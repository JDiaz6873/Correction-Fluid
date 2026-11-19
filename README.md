<<<<<<< HEAD
# Correction Fluid — AI Resume Tailor

Correction Fluid compares a resume against a specific job description and tells you how to make it stand out.

=======
# Correction-Fluid
This is my attempt at making an AI resume parser to help tailor my resume for different roles and positions that allow for more optimal application and interview processes through job description comparisons.
>>>>>>> 0c7dcb61a2104e0eee03292a97781f951c079f39
## Features
- **Upload or paste your resume.** Accepts PDF, DOCX or TXT (up to 8 MB), or pasted text.
- **Match score (0–100)** plus scores for skills fit, experience, ATS keywords, impact & metrics, and clarity.
- **Keyword coverage:** which important keywords from the job are missing and which are already on your resume.
- **Strengths and gaps:** what helps you for this role and what holds you back.
- **Tailored summary:** a professional summary rewritten for the job, with a copy button.
- **Line-by-line edits:** 6–10 prioritized recommendations showing the original line struck through and a rewritten version. You can filter them by priority and copy them.
- Nothing is stored. Each resume is analyzed when you submit it and then discarded.

## Tech stack
- **Frontend** (`webapp/`): React + Vite, Tailwind, shadcn/ui, Framer Motion, React Query
- **Backend** (`backend/`): Bun + Hono
- **AI:** Claude Opus 5.5 (Anthropic Messages API) with JSON-schema structured outputs. PDFs are sent to Claude directly as documents. DOCX files are converted to text with `mammoth`.

## API
`POST /api/analyze` (multipart form)
| field | description |
| --- | --- |
| `resume` | file (PDF / DOCX / TXT), optional if `resumeText` is given |
| `resumeText` | pasted resume text (100+ chars) |
| `jobDescription` | job posting text (50+ chars) |

Returns `{ data: Analysis }`. The `Analysis` Zod schema is defined in `backend/src/types.ts`.

## Project structure
```
backend/src/
  routes/analyze.ts      upload handling + validation
  lib/resume-parser.ts   PDF / DOCX / TXT handling
  lib/analyzer.ts        Claude prompt + structured output schema
  types.ts               shared Zod contracts
webapp/src/
  pages/Index.tsx        form → analyzing → results flow
  hooks/use-analyze.ts   React Query mutation
  components/redline/    header, hero, inputs, loading state
  components/redline/results/  score dial, breakdown, keywords, edits, summary
```
<<<<<<< HEAD

## Running locally
```bash
cd backend && bun install && bun run dev     # needs ANTHROPIC_API_KEY in backend/.env
cd webapp && bun install && bun run dev      # set VITE_BACKEND_URL=http://localhost:3000
```
=======
>>>>>>> 0c7dcb61a2104e0eee03292a97781f951c079f39
