'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { config } from '@/lib/config';
import TimelineIcon from './TimelineIcon';

export default function Timeline() {
  return (
    <section id="giornata" className="section-bed relative z-10 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">Dita</p>
          <h2 className="display mt-3 text-4xl gold-text sm:text-5xl">Filli i ditës</h2>
          <p className="mt-3 text-sm text-cream/75 sm:text-base">
            Nga «po»-ja e mëngjesit deri te kërcimet e fundit mbi liqen.
          </p>
          <div className="divider mx-auto mt-4 w-24" />
        </div>

        <ol className="relative mt-14 space-y-10 sm:space-y-14">
          <span aria-hidden className="timeline-rail" />

          {config.schedule.map((item, i) => {
            const isLeft = i % 2 === 0;

            const iconBlock = (
              <div className="flex items-center justify-center">
                {item.image ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gold/30 bg-ink/40 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.6)] sm:h-24 sm:w-24">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                ) : (
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/35 bg-ink/45 text-gold shadow-[0_10px_28px_-10px_rgba(0,0,0,0.6)] sm:h-20 sm:w-20">
                    <TimelineIcon name={item.icon} />
                  </span>
                )}
              </div>
            );

            const card = (
              <article className="glass-soft rounded-2xl p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold/85">
                    Momenti {String(i + 1).padStart(2, '0')}
                  </p>
                  <span className="display text-base text-gold sm:hidden">{item.time}</span>
                </div>
                <h3 className="display mt-2 text-2xl text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/85 sm:text-base">{item.text}</p>
              </article>
            );

            const timeBadge = (
              <div className={`hidden sm:block ${isLeft ? 'sm:text-right sm:pr-10' : 'sm:pl-10'}`}>
                <span className="display block text-3xl text-gold">{item.time}</span>
                <div className={`mt-3 ${isLeft ? 'sm:flex sm:justify-end' : ''}`}>
                  {iconBlock}
                </div>
              </div>
            );

            return (
              <motion.li
                key={`${item.time}-${item.title}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55 }}
                className="relative pl-12 sm:grid sm:grid-cols-2 sm:items-center sm:gap-12 sm:pl-0"
              >
                {/* Dot on the rail */}
                <span
                  aria-hidden
                  className="absolute left-[18px] top-6 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold ring-4 ring-ink/85 sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2"
                />

                {/* Desktop alternating layout */}
                {isLeft ? timeBadge : <div className="hidden sm:block">{card}</div>}
                {isLeft ? <div className="hidden sm:block">{card}</div> : timeBadge}

                {/* Mobile: icon + card stacked */}
                <div className="sm:hidden">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/35 bg-ink/55 text-gold">
                      <TimelineIcon name={item.icon} className="!h-9 !w-9" />
                    </span>
                  </div>
                  {card}
                </div>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-16 glass rounded-2xl p-6 sm:p-8">
          <p className="eyebrow text-center">Informacion për të ftuarit</p>
          <h3 className="display mt-2 text-center text-2xl text-cream sm:text-3xl">
            {config.stayInfo.title}
          </h3>
          <div className="mx-auto mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-cream/85 sm:text-base">
            {config.stayInfo.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
