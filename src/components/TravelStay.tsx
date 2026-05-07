'use client';

import { motion } from 'framer-motion';
import { config } from '@/lib/config';

export default function TravelStay() {
  const t = config.travel;

  return (
    <section id="viaggio" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="display mt-3 text-4xl gold-text sm:text-5xl">{t.title}</h2>
          <div className="divider mx-auto mt-4 w-24" />
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {t.routes.map((r, i) => (
            <motion.li
              key={r.from}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.06 }}
              className="glass-soft flex items-start gap-4 rounded-2xl p-4 sm:p-5"
            >
              <span
                aria-hidden
                className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-7-4.35-7-10a7 7 0 1 1 14 0c0 5.65-7 10-7 10z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <circle cx="12" cy="11" r="2.4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <div>
                <p className="display text-lg text-cream">{r.from}</p>
                <p className="mt-0.5 text-sm text-cream/70">{r.detail}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-8">
          <div className="glass mx-auto max-w-2xl rounded-2xl p-5 sm:p-6">
            <p className="eyebrow">Parkimi</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/80">{t.parking}</p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm italic text-cream/65">{t.note}</p>
      </div>
    </section>
  );
}
