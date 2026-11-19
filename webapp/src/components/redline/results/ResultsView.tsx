import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Analysis } from "@/lib/types";
import { ScoreOverview } from "./ScoreOverview";
import { KeywordPanel } from "./KeywordPanel";
import { StrengthsGaps } from "./StrengthsGaps";
import { RecommendationList } from "./RecommendationList";
import { SummaryRewrite } from "./SummaryRewrite";

export function ResultsView({ analysis, onReset }: { analysis: Analysis; onReset: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-6xl space-y-6 px-5 pb-24 pt-6 md:px-8 md:pt-10"
      data-testid="results"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-2">Report{analysis.candidateName ? ` · ${analysis.candidateName}` : ""}</p>
          <h1 className="font-display text-4xl font-light tracking-tight md:text-5xl">
            vs. <span className="italic">{analysis.jobTitle}</span>
          </h1>
        </div>
        <Button variant="outline" onClick={onReset} className="self-start sm:self-auto">
          <RotateCcw /> New review
        </Button>
      </div>

      <ScoreOverview analysis={analysis} />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <KeywordPanel keywords={analysis.keywords} />
        <StrengthsGaps strengths={analysis.strengths} gaps={analysis.gaps} />
      </div>

      <SummaryRewrite text={analysis.rewrittenSummary} jobTitle={analysis.jobTitle} />

      <div className="pt-6">
        <RecommendationList items={analysis.recommendations} />
      </div>
    </motion.section>
  );
}
