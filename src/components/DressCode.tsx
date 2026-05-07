'use client';

import { motion } from 'framer-motion';
import { config } from '@/lib/config';

export default function DressCode() {
  const d = config.dressCode;
  return (
    <section id="dresscode" className="section-bed relative z-10 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">{d.eyebrow}</p>
          <h2 className="display mt-3 text-4xl gold-text sm:text-5xl">{d.title}</h2>
          <div className="divider mx-auto mt-4 w-24" />
        </div>

        <div className="mt-10 space-y-5">
          {d.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="text-base leading-relaxed text-cream/90 sm:text-lg"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="mt-12">
          <p className="eyebrow text-center">Palette</p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            {d.palette.map((c) => (
              <li key={c.hex} className="flex flex-col items-center gap-2">
                <span
                  aria-hidden
                  className="block h-12 w-12 rounded-full border border-cream/15 shadow-[0_8px_24px_rgba(0,0,0,0.4)] sm:h-14 sm:w-14"
                  style={{ background: c.hex }}
                />
                <span className="text-xs text-cream/80">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 text-center text-sm italic text-rose/90">{d.avoid}</p>
      </div>
    </section>
  );
}
