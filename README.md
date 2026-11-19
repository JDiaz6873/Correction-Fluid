
# Correction Fluid: AI Resume Tailor

**Correction Fluid checks your resume against a job posting and tells you exactly how to improve it for that job.**

I built this to make applying for jobs easier. Instead of guessing what an employer wants, you paste in the job description and your resume, and the app shows you what's missing and how to fix it.

## What it does

1. **You give it two things:** your resume and the job posting.
   - Resume: upload a file (PDF, Word `.docx`, or `.txt`, up to 8 MB) or paste the text.
   - Job posting: paste the text of the job description.
2. **It gives you back:**
   - **Match score (0 to 100):** how well your resume fits the job, plus smaller scores for skills, experience, keywords, results/numbers, and clarity.
   - **Keyword check:** which important words from the job posting are already on your resume and which are missing. This matters because many companies use software (called an ATS) that scans resumes for keywords.
   - **Strengths and gaps:** what helps you for this role and what holds you back.
   - **A rewritten summary:** a short professional summary tailored to the job, with a copy button.
   - **Line-by-line edits:** 6 to 10 suggested changes, ranked by importance. Each one shows your original line crossed out next to a better version. You can filter by priority and copy any edit.

**Privacy:** Nothing is saved. Your resume is analyzed when you submit it and then discarded.

## What it's built with

You don't need to know these to use the app. They're listed for anyone who wants to work on the code.

| Part | What it does | Tools |
|---|---|---|
| **Frontend** (`webapp/`) | The website you see and click | React, Vite, Tailwind, shadcn/ui, Framer Motion, React Query |
| **Backend** (`backend/`) | The behind-the-scenes server that handles your files and talks to the AI | Bun, Hono |
| **AI** | Reads your resume and the job posting and writes the feedback | Claude Opus 5.5 (Anthropic API) |

PDF resumes are sent straight to the AI. Word files are first turned into plain text using a tool called mammoth.

## Run it on your own computer

**You'll need:**
- [Bun](https://bun.sh) installed (a tool that runs the code)
- An Anthropic API key (get one at console.anthropic.com)

**Step 1: Start the backend.** Open a terminal and run:
```
cd backend
bun install
bun run dev
```
Before this works, create a file named `.env` inside the `backend` folder and add this line (use your own key):
```
ANTHROPIC_API_KEY=your-key-here
```
Keep this file private. Never upload it to GitHub.

**Step 2: Start the website.** Open a second terminal and run:
```
cd webapp
bun install
bun run dev
```
Before this works, create a file named `.env` inside the `webapp` folder and add:
```
VITE_BACKEND_URL=http://localhost:3000
```

**Step 3:** Open the address the webapp terminal prints (usually `http://localhost:5173`) in your browser.

## Where things are

```
backend/src/
  routes/analyze.ts      receives the upload and checks it
  lib/resume-parser.ts   reads PDF, Word, and text files
  lib/analyzer.ts        sends the resume and job to the AI
  types.ts               defines the shape of the results

webapp/src/
  pages/Index.tsx        the main flow: form, loading, results
  hooks/use-analyze.ts   sends the request to the backend
  components/redline/    the visual pieces of the site
    results/             score dial, keywords, edits, summary
```

## For developers: the API

**`POST /api/analyze`** (multipart form)

| Field | Description |
|---|---|
| `resume` | A PDF, DOCX, or TXT file. Optional if you send `resumeText`. |
| `resumeText` | Pasted resume text (at least 100 characters) |
| `jobDescription` | Job posting text (at least 50 characters) |

Returns `{ data: Analysis }`. The exact shape of `Analysis` is defined in `backend/src/types.ts`.
