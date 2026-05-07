'use client';

import { useState } from 'react';
import { config } from '@/lib/config';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="domande" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">Pyetje të shpeshta</p>
          <h2 className="display mt-3 text-4xl gold-text sm:text-5xl">Të dini</h2>
          <div className="divider mx-auto mt-4 w-24" />
        </div>

        <ul className="mt-12 space-y-3">
          {config.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="glass-soft overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="display text-lg text-cream sm:text-xl">{item.q}</span>
                  <span
                    aria-hidden
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-cream/80 sm:px-6 sm:pb-6 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
