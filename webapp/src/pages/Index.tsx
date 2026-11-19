import { AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/redline/SiteHeader";
import { Hero } from "@/components/redline/Hero";
import { InputForm } from "@/components/redline/InputForm";
import { AnalyzingState } from "@/components/redline/AnalyzingState";
import { ResultsView } from "@/components/redline/results/ResultsView";
import { SiteFooter } from "@/components/redline/SiteFooter";
import { useAnalyze } from "@/hooks/use-analyze";

const Index = () => {
  const analyze = useAnalyze();

  const reset = () => {
    analyze.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader onReset={reset} />
      <main>
        <AnimatePresence mode="wait">
          {analyze.isPending ? (
            <AnalyzingState key="loading" />
          ) : analyze.data ? (
            <ResultsView key="results" analysis={analyze.data} onReset={reset} />
          ) : (
            <div key="form">
              <Hero />
              <InputForm onSubmit={(input) => analyze.mutate(input)} error={analyze.error?.message ?? null} />
            </div>
          )}
        </AnimatePresence>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
