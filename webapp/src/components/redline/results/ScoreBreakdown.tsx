import { motion } from "framer-motion";
import type { Analysis } from "@/lib/types";
import { cn } from "@/lib/utils";

const LABELS: Record<keyof Analysis["scoreBreakdown"], string> = {
  skills: "Skills fit",
  experience: "Experience",
  keywords: "ATS keywords",
  impact: "Impact & metrics",
  clarity: "Clarity",
};

export function ScoreBreakdown({ breakdown }: { breakdown: Analysis["scoreBreakdown"] }) {
  const entries = Object.entries(breakdown) as [keyof Analysis["scoreBreakdown"], number][];
  return (
    <div className="space-y-4">
      {entries.map(([key, value], i) => (
        <div key={key}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-sm">{LABELS[key]}</span>
            <span className="font-mono text-xs text-muted-foreground">{Math.round(value)}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "h-full rounded-full",
                value >= 75 ? "bg-accent" : value >= 50 ? "bg-foreground" : "bg-primary",
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
