'use client';

import { motion } from 'framer-motion';
import { config } from '@/lib/config';

export default function Hero() {
  return (
    <section
      id="invito"
      className="relative z-10 flex min-h-[100svh] flex-col items-center px-6 pb-24 pt-[12svh] text-center sm:pt-[14svh]"
    >
      {/* Top scrim — calms the bg image behind names */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[55svh] bg-[linear-gradient(180deg,rgba(11,7,16,0.55)_0%,rgba(11,7,16,0.35)_55%,transparent_100%)]"
      />
      {/* Bottom fade into the next section */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[28svh] bg-[linear-gradient(0deg,rgba(11,7,16,0.85)_0%,transparent_100%)]"
      />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="eyebrow"
      >
        Ruani datën · {config.dateLabelShort}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-4 script text-2xl text-rose/85 sm:text-3xl"
      >
        Së bashku me ju do të festojmë
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.55 }}
        className="display text-shadow-soft mt-3 text-[clamp(2.6rem,12vw,7.2rem)] leading-[0.95]"
      >
        <span className="gold-text">{config.bride}</span>
        <span className="script mx-3 align-middle text-[clamp(2rem,9vw,5rem)] text-rose">
          &amp;
        </span>
        <span className="gold-text">{config.groom}</span>
      </motion.h1>

      {config.heroTagline ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="text-shadow-soft mt-5 max-w-md text-sm leading-relaxed text-cream/85 sm:text-base"
        >
          {config.heroTagline}
        </motion.p>
      ) : null}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="mt-9 flex flex-col items-center gap-3"
      >
        <span className="divider-ornament">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.83A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </span>

        <p className="display text-shadow-soft text-2xl tracking-wide text-cream/95 sm:text-3xl">
          {config.dateLabel}
        </p>
        <p className="text-shadow-soft text-xs uppercase tracking-[0.32em] text-cream/80">
          {config.timeLabel} · Ceremonia
        </p>
        <p className="script text-shadow-soft mt-1 text-3xl text-cream/95 sm:text-4xl">
          {config.venue.name}
        </p>
        <p className="text-shadow-soft max-w-xs text-xs text-cream/75">{config.venue.region}</p>
      </motion.div>

      <motion.a
        href="#countdown"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="bob absolute bottom-6 inline-flex flex-col items-center gap-1 text-cream/65 hover:text-gold"
        aria-label="Lëvizni për të zbuluar"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Zbuloni</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>
    </section>
  );
}
