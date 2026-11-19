import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Reading your resume",
  "Breaking down the job description",
  "Matching skills and keywords",
  "Scoring impact and clarity",
  "Drafting line-by-line edits",
];

export function AnalyzingState() {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1fr_1.1fr] md:px-8 md:py-16"
      data-testid="analyzing"
    >
      <div className="paper-sheet relative h-80 overflow-hidden p-8">
        <div className="space-y-3">
          <div className="h-4 w-1/2 rounded-sm bg-foreground/80" />
          <div className="h-2 w-1/3 rounded-sm bg-muted-foreground/40" />
          <div className="pt-4" />
          {[90, 75, 82, 60, 88, 70, 78, 55].map((w, i) => (
            <div key={i} className="h-2 rounded-sm bg-muted" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 animate-scan bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-primary/40" />
      </div>

      <div className="flex flex-col justify-center">
        <p className="eyebrow mb-3">Under review</p>
        <h2 className="mb-8 font-display text-4xl font-light tracking-tight md:text-5xl">
          The editor is <span className="italic text-primary">marking up</span> your resume.
        </h2>
        <ol className="space-y-3">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={cn(
                "flex items-center gap-3 font-mono text-sm transition-colors",
                i < step ? "text-foreground" : i === step ? "text-foreground" : "text-muted-foreground/50",
              )}
            >
              <span className="flex h-5 w-5 items-center justify-center">
                {i < step ? (
                  <Check className="h-4 w-4 text-accent" />
                ) : i === step ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                )}
              </span>
              {label}
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted-foreground">This usually takes 20–40 seconds.</p>
      </div>
    </motion.section>
  );
}
