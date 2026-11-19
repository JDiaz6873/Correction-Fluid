const examples = {
  left: [
    { role: "Software engineer", slug: "software-engineer" },
    { role: "Graphic designer", slug: "graphic-designer" },
  ],
  right: [
    { role: "Marketing manager", slug: "marketing-manager" },
    { role: "Registered nurse", slug: "registered-nurse" },
  ],
};

export function ResumeShowcase({ side }: { side: "left" | "right" }) {
  return (
    <aside className={`resume-showcase resume-showcase--${side}`} aria-label={`${side === "left" ? "Technology and design" : "Marketing and healthcare"} resume examples`}>
      <div className="resume-showcase-stack">
        {examples[side].map((example, index) => (
          <figure key={example.slug} className={`resume-example resume-example--${index}`}>
            <div className="resume-image-frame">
              <img
                src={`https://resumeworded.com/assets/images/resume-guides/${example.slug}.png`}
                alt={`Example resume tailored for a ${example.role.toLowerCase()} role`}
                width={360}
                height={480}
                referrerPolicy="no-referrer"
              />
            </div>
            <figcaption className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {example.role}
            </figcaption>
          </figure>
        ))}
      </div>
      <a href="https://resumeworded.com/resume-examples" target="_blank" rel="noreferrer" className="resume-source text-muted-foreground underline decoration-border underline-offset-4 hover:text-primary">
        Examples via Resume Worded
      </a>
    </aside>
  );
}
