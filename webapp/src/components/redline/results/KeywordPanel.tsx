import { Check, Plus } from "lucide-react";
import type { Analysis } from "@/lib/types";

export function KeywordPanel({ keywords }: { keywords: Analysis["keywords"] }) {
  const total = keywords.matched.length + keywords.missing.length;
  return (
    <div className="paper-sheet p-6">
      <div className="mb-5 flex items-baseline justify-between">
        <h3 className="font-display text-xl font-medium">Keyword coverage</h3>
        <span className="font-mono text-xs text-muted-foreground">
          {keywords.matched.length}/{total} found
        </span>
      </div>
      <p className="eyebrow mb-3">Missing — add where true</p>
      <div className="mb-6 flex flex-wrap gap-2" data-testid="missing-keywords">
        {keywords.missing.map((k) => (
          <span key={k} className="inline-flex items-center gap-1 rounded-sm border border-primary/30 bg-primary/5 px-2 py-1 text-sm text-primary">
            <Plus className="h-3 w-3" /> {k}
          </span>
        ))}
      </div>
      <p className="eyebrow mb-3">Already on your resume</p>
      <div className="flex flex-wrap gap-2">
        {keywords.matched.map((k) => (
          <span key={k} className="inline-flex items-center gap-1 rounded-sm border border-accent/30 bg-accent/5 px-2 py-1 text-sm text-accent">
            <Check className="h-3 w-3" /> {k}
          </span>
        ))}
      </div>
    </div>
  );
}
