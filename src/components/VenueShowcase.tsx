'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { config } from '@/lib/config';

export default function VenueShowcase() {
  const v = config.venueShowcase;

  return (
    <section id="luogo" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="eyebrow">{v.eyebrow}</p>
          <h2 className="display mt-3 text-4xl gold-text sm:text-5xl">{v.title}</h2>
          <div className="divider mx-auto mt-4 w-24" />
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-[1fr_1.1fr] sm:items-center">
          <div className="space-y-5">
            {v.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-base leading-relaxed text-cream/85 sm:text-lg"
              >
                {p}
              </motion.p>
            ))}

            <ul className="mt-2 grid grid-cols-3 gap-3 pt-2">
              {v.facts.map((f) => (
                <li key={f.label} className="glass-soft rounded-xl p-3 text-center">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">{f.label}</div>
                  <div className="mt-1 display text-lg text-cream/95">{f.value}</div>
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/15"
          >
            <Image
              src={v.image}
              alt={`${config.venue.name} dall'alto`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="script text-2xl text-cream/95">{config.venue.name}</p>
              <p className="text-xs text-cream/70">{config.venue.region}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
