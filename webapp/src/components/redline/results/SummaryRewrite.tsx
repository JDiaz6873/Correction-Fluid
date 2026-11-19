import { CopyButton } from "./CopyButton";

export function SummaryRewrite({ text, jobTitle }: { text: string; jobTitle: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-ink p-6 text-ink-foreground md:p-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">
          Tailored summary · {jobTitle}
        </p>
        <CopyButton text={text} className="text-ink-foreground/70 hover:bg-ink-foreground/10 hover:text-ink-foreground" />
      </div>
      <p className="font-display text-xl font-light italic leading-relaxed md:text-2xl">“{text}”</p>
      <p className="mt-5 text-xs opacity-60">Paste this at the top of your resume. Replace any [bracketed] placeholders with your real numbers.</p>
    </div>
  );
}
