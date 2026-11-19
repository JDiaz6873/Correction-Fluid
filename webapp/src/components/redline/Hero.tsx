import { motion } from "framer-motion";
import { ResumeShowcase } from "./ResumeShowcase";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section className="correction-hero relative mx-auto px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
      <ResumeShowcase side="left" />
      <div className="hero-copy mx-auto text-center">
        <motion.p {...fade(0)} className="eyebrow mb-6">
          A fresh start. A stronger first impression.
        </motion.p>
        <motion.div {...fade(0.08)} className="title-banner" data-testid="title-banner">
          <span className="banner-note font-mono text-[10px] uppercase tracking-[0.2em]">A little polish. A lot of possibility.</span>
          <h1 className="mt-3 font-display text-[2.7rem] font-medium leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            Correction <span className="italic">Fluid</span>
          </h1>
          <span className="banner-underline" aria-hidden="true" />
        </motion.div>
        <motion.h2 {...fade(0.16)} className="mt-8 font-display text-3xl font-light leading-tight tracking-tight sm:text-4xl">
          Smooth out the rough spots.<br />
          Stand out for <span className="font-normal italic text-primary">the right role.</span>
        </motion.h2>
        <motion.p {...fade(0.24)} className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          Your experience, just better expressed. Correction Fluid compares your resume to the job you want,
          spots missing keywords, and helps you turn weak lines into a stronger story.
        </motion.p>
        <motion.p {...fade(0.3)} className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Your experience stays true. Your potential shines through.
        </motion.p>
      </div>
      <ResumeShowcase side="right" />
    </section>
  );
}
