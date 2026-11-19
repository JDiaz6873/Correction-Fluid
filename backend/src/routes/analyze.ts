import { Hono } from "hono";
import { analyzeResume, AnalyzerError } from "../lib/analyzer";
import { parseResumeFile, ResumeParseError, type ResumeContent } from "../lib/resume-parser";

const analyzeRouter = new Hono();

const fail = (message: string, code: string) => ({ error: { message, code } });

analyzeRouter.post("/", async (c) => {
  const form = await c.req.formData().catch(() => null);
  if (!form) return c.json(fail("Expected form data.", "BAD_REQUEST"), 400);

  const jobDescription = String(form.get("jobDescription") ?? "").trim();
  const resumeText = String(form.get("resumeText") ?? "").trim();
  const file = form.get("resume");

  if (jobDescription.length < 50) {
    return c.json(fail("Please paste a fuller job description (at least a few sentences).", "JOB_TOO_SHORT"), 400);
  }

  let resume: ResumeContent;
  try {
    if (file instanceof File && file.size > 0) {
      resume = await parseResumeFile(file);
    } else if (resumeText.length >= 100) {
      resume = { kind: "text", text: resumeText };
    } else {
      return c.json(fail("Upload a resume file or paste your resume text.", "RESUME_MISSING"), 400);
    }
  } catch (err) {
    if (err instanceof ResumeParseError) return c.json(fail(err.message, "RESUME_PARSE"), 400);
    console.error("[analyze] parse error", err);
    return c.json(fail("Couldn't read that file.", "RESUME_PARSE"), 400);
  }

  try {
    const analysis = await analyzeResume(resume, jobDescription.slice(0, 20000));
    return c.json({ data: analysis });
  } catch (err) {
    const message = err instanceof AnalyzerError ? err.message : "Something went wrong. Please try again.";
    console.error("[analyze] failure", err);
    return c.json(fail(message, "ANALYZE_FAILED"), 502);
  }
});

export { analyzeRouter };
