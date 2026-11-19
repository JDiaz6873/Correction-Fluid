export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:justify-between md:px-8">
        <span className="font-display text-sm text-foreground">Correction Fluid</span>
        <span className="font-mono">Suggestions are AI-generated. Only claim what's true.</span>
      </div>
    </footer>
  );
}
