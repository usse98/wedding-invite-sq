'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { config } from '@/lib/config';
import { useCallback, useEffect, useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const photos = config.gallery;
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i + photos.length - 1) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close, prev, next]);

  return (
    <section id="galleria" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="eyebrow">Kështjella</p>
          <h2 className="display mt-3 text-4xl gold-text sm:text-5xl">Galeri</h2>
          <p className="mt-3 text-sm text-cream/65">Prekni një imazh për ta zmadhuar.</p>
          <div className="divider mx-auto mt-4 w-24" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {photos.map((src, i) => (
            <motion.button
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              onClick={() => setIndex(i)}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-gold/15 bg-ink/40"
              aria-label={`Hap foton ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${config.venue.name} — moment ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </motion.button>
          ))}
        </div>
      </div>

      {isOpen && index !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Galeri fotosh"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Mbyll"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-cream/25 bg-black/40 text-cream/85 hover:bg-black/70"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {photos.length > 1 ? (
            <button
              type="button"
              aria-label="Foto e mëparshme"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/25 bg-black/40 text-cream/85 hover:bg-black/70 sm:left-6"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          ) : null}

          <div
            className="relative max-h-[88vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={photos[index]}
              src={photos[index]}
              alt={`${config.venue.name} — momento ${index + 1}`}
              width={1600}
              height={1200}
              className="mx-auto max-h-[88vh] w-auto rounded-lg object-contain"
              priority
            />
            <div className="mt-3 text-center text-xs text-cream/60">
              {index + 1} / {photos.length}
            </div>
          </div>

          {photos.length > 1 ? (
            <button
              type="button"
              aria-label="Foto pasuese"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/25 bg-black/40 text-cream/85 hover:bg-black/70 sm:right-6"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
