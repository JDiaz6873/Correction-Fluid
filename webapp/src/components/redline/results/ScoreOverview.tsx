import type { Analysis } from "@/lib/types";
import { ScoreDial } from "./ScoreDial";
import { ScoreBreakdown } from "./ScoreBreakdown";

export function ScoreOverview({ analysis }: { analysis: Analysis }) {
  return (
    <div className="paper-sheet grid gap-8 p-6 md:grid-cols-[auto_1fr_1fr] md:items-center md:p-8">
      <div className="flex justify-center md:justify-start">
        <ScoreDial score={analysis.matchScore} />
      </div>
      <div>
        <p className="eyebrow mb-2">The verdict</p>
        <p className="font-display text-2xl font-normal leading-snug tracking-tight md:text-[1.7rem]">
          {analysis.verdict}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{analysis.summary}</p>
      </div>
      <div className="md:border-l md:border-border md:pl-8">
        <ScoreBreakdown breakdown={analysis.scoreBreakdown} />
      </div>
    </div>
  );
}
