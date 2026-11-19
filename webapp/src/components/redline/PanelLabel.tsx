export function PanelLabel({ index, title, hint }: { index: string; title: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-primary">{index}</span>
        <h2 className="panel-title-highlight font-display text-2xl font-medium tracking-tight">{title}</h2>
      </div>
      {hint ? <span className="eyebrow hidden sm:inline">{hint}</span> : null}
    </div>
  );
}
