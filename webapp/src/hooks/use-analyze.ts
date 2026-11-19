import { useMutation } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import type { Analysis } from "@/lib/types";

export interface AnalyzeInput {
  file: File | null;
  resumeText: string;
  jobDescription: string;
}

async function analyze({ file, resumeText, jobDescription }: AnalyzeInput): Promise<Analysis> {
  const form = new FormData();
  form.append("jobDescription", jobDescription);
  if (file) form.append("resume", file);
  else form.append("resumeText", resumeText);

  const res = await api.raw("/api/analyze", { method: "POST", body: form });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(json?.error?.message ?? "Something went wrong. Please try again.", res.status);
  }
  return json.data as Analysis;
}

export function useAnalyze() {
  return useMutation({ mutationFn: analyze });
}
