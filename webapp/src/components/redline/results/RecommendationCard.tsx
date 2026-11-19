import { motion } from "framer-motion";
import type { Recommendation } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CopyButton } from "./CopyButton";

const PRIORITY_STYLES: Record<Recommendation["priority"], string> = {
  high: "bg-primary text-primary-foreground",
  medium: "bg-ink text-ink-foreground",
  low: "bg-secondary text-secondary-foreground",
};

export function RecommendationCard({ rec, index }: { rec: Recommendation; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
      className="paper-sheet group grid gap-5 p-5 md:grid-cols-[3.5rem_1fr] md:p-6"
      data-testid="recommendation"
    >
      <div className="flex items-center gap-3 md:flex-col md:items-start">
        <span className="font-display text-3xl font-light leading-none text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className={cn("rounded-sm px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider", PRIORITY_STYLES[rec.priority])}>
            {rec.priority}
          </span>
          <span className="eyebrow">{rec.category}</span>
        </div>
        <h4 className="font-display text-xl font-medium leading-snug tracking-tight">{rec.title}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{rec.why}</p>

        <div className="mt-4 overflow-hidden rounded-md border border-border">
          {rec.before ? (
            <div className="flex gap-3 border-b border-border bg-primary/[0.04] px-4 py-3">
              <span className="font-mono text-xs font-semibold text-primary">−</span>
              <p className="redline-strike text-sm leading-relaxed text-muted-foreground">{rec.before}</p>
            </div>
          ) : null}
          <div className="flex items-start gap-3 bg-accent/[0.05] px-4 py-3">
            <span className="font-mono text-xs font-semibold text-accent">+</span>
            <p className="flex-1 text-sm leading-relaxed">{rec.after}</p>
            <CopyButton text={rec.after} className="-my-1 shrink-0 opacity-70 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
