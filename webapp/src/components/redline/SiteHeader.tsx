import { Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader({ onReset }: { onReset?: () => void }) {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
      <Button variant="ghost" onClick={onReset} className="group h-auto gap-2.5 p-0 text-foreground hover:bg-transparent hover:text-foreground" aria-label="Correction Fluid home">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:-rotate-6">
          <Paintbrush className="h-4 w-4" />
        </span>
        <span className="font-display text-xl font-semibold tracking-tight">
          Correction <span className="italic text-primary">Fluid</span>
        </span>
      </Button>
      <div className="hidden items-center gap-6 sm:flex">
        <span className="eyebrow">Resume × Job match</span>
        <span className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          AI editor online
        </span>
      </div>
    </header>
  );
}
