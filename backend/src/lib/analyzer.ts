import { AnalysisSchema, type Analysis } from "../types";
import type { ResumeContent } from "./resume-parser";

const SYSTEM_PROMPT = `You are a senior technical recruiter and professional resume editor. You compare a candidate's resume against a specific job description and give blunt, specific, actionable edits that make the resume stand out for THAT job and pass applicant tracking systems (ATS).

Rules:
- Be specific. Quote real lines from the resume in "before" and give a concrete rewritten line in "after".
- Never invent experience, employers, degrees, or numbers the candidate doesn't have. When a metric would help, use a bracketed placeholder like "[X%]" so the candidate fills in the truth.
- Use keywords and phrasing from the job description where they honestly apply.
- Scores are 0-100 and should be realistic, not flattering.
- Give 6-10 recommendations ordered by impact. "before" may be null when the recommendation adds something new.
- Categories should be short labels like "Keywords", "Impact", "Summary", "Skills", "Experience", "Formatting", "Tailoring".

Respond with ONLY a JSON object (no markdown fences, no commentary) with exactly this shape:
{
  "candidateName": string | null,
  "jobTitle": string,
  "matchScore": number,
  "verdict": string,            // one punchy sentence, max 14 words
  "summary": string,            // 2-3 sentence overall assessment
  "scoreBreakdown": { "skills": number, "experience": number, "keywords": number, "impact": number, "clarity": number },
  "keywords": { "matched": string[], "missing": string[] },   // important job keywords, up to 14 each
  "strengths": string[],        // 3-5 items
  "gaps": string[],             // 3-5 items
  "recommendations": [ { "priority": "high"|"medium"|"low", "category": string, "title": string, "why": string, "before": string | null, "after": string } ],
  "rewrittenSummary": string    // a tailored 2-4 sentence professional summary for the top of the resume
}`;

const str = { type: "string" };
const num = { type: "number" };
const strArr = { type: "array", items: str };

const OUTPUT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["candidateName", "jobTitle", "matchScore", "verdict", "summary", "scoreBreakdown", "keywords", "strengths", "gaps", "recommendations", "rewrittenSummary"],
  properties: {
    candidateName: { anyOf: [str, { type: "null" }] },
    jobTitle: str,
    matchScore: num,
    verdict: str,
    summary: str,
    scoreBreakdown: {
      type: "object",
      additionalProperties: false,
      required: ["skills", "experience", "keywords", "impact", "clarity"],
      properties: { skills: num, experience: num, keywords: num, impact: num, clarity: num },
    },
    keywords: {
      type: "object",
      additionalProperties: false,
      required: ["matched", "missing"],
      properties: { matched: strArr, missing: strArr },
    },
    strengths: strArr,
    gaps: strArr,
    recommendations: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["priority", "category", "title", "why", "before", "after"],
        properties: {
          priority: { type: "string", enum: ["high", "medium", "low"] },
          category: str,
          title: str,
          why: str,
          before: { anyOf: [str, { type: "null" }] },
          after: str,
        },
      },
    },
    rewrittenSummary: str,
  },
};

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export class AnalyzerError extends Error {}

function extractJson(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new AnalyzerError("The AI response wasn't in the expected format.");
  return JSON.parse(text.slice(start, end + 1));
}

export async function analyzeResume(resume: ResumeContent, jobDescription: string): Promise<Analysis> {
  const resumeBlock =
    resume.kind === "pdf"
      ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: resume.base64 } }
      : { type: "text", text: `<resume>\n${resume.text}\n</resume>` };

  const baseUrl = process.env.ANTHROPIC_BASE_URL ?? "https://api.anthropic.com";
  const res = await fetch(`${baseUrl}/v1/messages`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-opus-5-5",
      output_config: { effort: "medium", format: { type: "json_schema", schema: OUTPUT_SCHEMA } },
      max_tokens: 12000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            resumeBlock,
            { type: "text", text: `<job_description>\n${jobDescription}\n</job_description>\n\nAnalyze the resume against this job and return the JSON.` },
          ],
        },
      ],
    }),
  });

  const data = (await res.json()) as {
    stop_reason?: string;
    content?: Array<{ type: string; text?: string }>;
    error?: { message?: string };
  };
  if (!res.ok) {
    console.error("[analyzer] Anthropic error", res.status, data.error?.message);
    throw new AnalyzerError("The AI service had a problem. Please try again.");
  }
  if (data.stop_reason === "refusal") throw new AnalyzerError("The AI declined to analyze this content.");

  const text = (data.content ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("");

  try {
    const raw = extractJson(text) as Record<string, unknown> & {
      matchScore?: number;
      scoreBreakdown?: Record<string, number>;
    };
    if (typeof raw.matchScore === "number") raw.matchScore = clamp(raw.matchScore);
    if (raw.scoreBreakdown) {
      for (const k of Object.keys(raw.scoreBreakdown)) raw.scoreBreakdown[k] = clamp(raw.scoreBreakdown[k] ?? 0);
    }
    return AnalysisSchema.parse(raw);
  } catch (err) {
    console.error("[analyzer] parse failure", err, text.slice(0, 500));
    throw new AnalyzerError("Couldn't understand the AI's response. Please try again.");
  }
}
