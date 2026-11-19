import { motion } from "framer-motion";

export function scoreTone(score: number) {
  if (score >= 75) return { label: "Strong match", className: "text-accent", stroke: "hsl(var(--accent))" };
  if (score >= 50) return { label: "Partial match", className: "text-foreground", stroke: "hsl(var(--foreground))" };
  return { label: "Needs work", className: "text-primary", stroke: "hsl(var(--primary))" };
}

export function ScoreDial({ score }: { score: number }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const tone = scoreTone(score);
  return (
    <div className="relative h-44 w-44 shrink-0" data-testid="match-score">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
        <circle
          cx="80" cy="80" r={r + 9} fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 5"
        />
        <motion.circle
          cx="80" cy="80" r={r} fill="none" stroke={tone.stroke} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (score / 100) * c }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-6xl font-light leading-none tracking-tight">{Math.round(score)}</span>
        <span className={`mt-1 font-mono text-[10px] uppercase tracking-[0.18em] ${tone.className}`}>{tone.label}</span>
      </div>
    </div>
  );
}
