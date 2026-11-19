import { useState } from "react";
import type { Priority, Recommendation } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RecommendationCard } from "./RecommendationCard";

type Filter = "all" | Priority;
const FILTERS: Filter[] = ["all", "high", "medium", "low"];

export function RecommendationList({ items }: { items: Recommendation[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? items : items.filter((r) => r.priority === filter);

  return (
    <section>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-2">The markup</p>
          <h3 className="font-display text-3xl font-light tracking-tight md:text-4xl">
            {items.length} edits to make it stand out
          </h3>
        </div>
        <div className="flex gap-1 rounded-md border border-border bg-card p-1">
          {FILTERS.map((f) => {
            const count = f === "all" ? items.length : items.filter((r) => r.priority === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
                  filter === f ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-4">
        {visible.map((rec) => (
          <RecommendationCard key={rec.title} rec={rec} index={items.indexOf(rec)} />
        ))}
      </div>
    </section>
  );
}
