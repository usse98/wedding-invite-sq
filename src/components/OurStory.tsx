'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { config } from '@/lib/config';

function resolveStoryImageSrc(): string {
  const custom = config.story.image?.trim();
  const fallback = config.story.imageFallback?.trim() ?? '';
  return custom && custom.length > 0 ? custom : fallback;
}

export default function OurStory() {
  const initial = resolveStoryImageSrc();
  const [src, setSrc] = useState<string>(initial);

  return (
    <section id="storia" className="section-bed relative z-10 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="eyebrow">{config.story.eyebrow}</p>
          <h2 className="display mt-3 text-4xl gold-text sm:text-5xl">{config.story.title}</h2>
          <div className="divider mx-auto mt-4 w-24" />
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-[1.05fr_1fr] sm:items-center">
          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Soft radial backplate so a watercolor on white sits naturally on the dark theme */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(253,246,236,0.16)_0%,rgba(253,246,236,0.05)_55%,transparent_75%)]"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              {src ? (
                <Image
                  src={src}
                  alt="Illustrazione di Kristjana e Houssine"
                  fill
                  priority={false}
                  onError={() => {
                    const fb = config.story.imageFallback?.trim() ?? '';
                    if (fb && src !== fb) setSrc(fb);
                    else setSrc('');
                  }}
                  className="object-contain"
                  style={{ mixBlendMode: 'normal' }}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full min-h-[200px] items-center justify-center rounded-2xl border border-gold/20 bg-ink/40 px-6 text-center text-sm text-cream/70">
                  Illustrazione in arrivo
                </div>
              )}
              {/* Subtle bottom haze that fuses the white watercolor edge with the dark canvas */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/55 to-transparent"
              />
            </div>
          </motion.figure>

          <div className="space-y-5">
            {config.story.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-base leading-relaxed text-cream/90 sm:text-lg"
              >
                {p}
              </motion.p>
            ))}

            <p className="script pt-3 text-3xl text-rose">— Kristjana &amp; Houssine</p>
          </div>
        </div>
      </div>
    </section>
  );
}
