import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnalyzeInput } from "@/hooks/use-analyze";
import { ResumeInput, type ResumeMode } from "./ResumeInput";
import { JobInput } from "./JobInput";

interface Props {
  onSubmit: (input: AnalyzeInput) => void;
  error?: string | null;
}

export function InputForm({ onSubmit, error }: Props) {
  const [mode, setMode] = useState<ResumeMode>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");

  const resumeReady = mode === "upload" ? file !== null : resumeText.trim().length >= 100;
  const jobReady = jobDescription.trim().length >= 50;
  const ready = resumeReady && jobReady;

  const hint = !resumeReady
    ? mode === "upload" ? "Add your resume to begin" : "Paste a bit more of your resume"
    : !jobReady ? "Paste the job description" : "Ready when you are";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-5 pb-24 md:px-8"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <ResumeInput
          mode={mode}
          onModeChange={setMode}
          file={file}
          onFile={setFile}
          text={resumeText}
          onText={setResumeText}
        />
        <JobInput value={jobDescription} onChange={setJobDescription} />
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-xs text-muted-foreground">{hint}</p>
          {error ? <p className="mt-1 text-sm text-primary" data-testid="analyze-error">{error}</p> : null}
        </div>
        <Button
          variant="ghost"
          style={{ background: "var(--brand-wash)", color: "var(--brand-ink)" }}
          size="xl"
          disabled={!ready}
          data-testid="analyze-button"
          className="group w-full shadow-sm transition-[filter,box-shadow] hover:brightness-95 hover:shadow-md disabled:opacity-70 sm:w-auto"
          onClick={() => onSubmit({ file: mode === "upload" ? file : null, resumeText, jobDescription })}
        >
          Review my resume
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" /> Your resume is analyzed on the fly and never stored.
      </p>
    </motion.section>
  );
}
