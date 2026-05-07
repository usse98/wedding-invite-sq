'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { config } from '@/lib/config';

export default function ShareSection() {
  const [url, setUrl] = useState<string>(config.shareUrl || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!url && typeof window !== 'undefined') setUrl(window.location.origin);
  }, [url]);

  const text = `Jeni të ftuar në dasmën e ${config.bride} & ${config.groom} — ${config.dateLabel}`;

  const tryShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: text, text, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const wa = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
  const tg = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  const mail = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;

  return (
    <section id="condividi" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Ndaje</p>
        <h2 className="display mt-3 text-4xl gold-text sm:text-5xl">Ftesa është edhe e juaja</h2>
        <div className="divider mx-auto mt-4 w-24" />

        <div className="glass mx-auto mt-10 rounded-2xl p-6">
          <div className="mx-auto inline-block rounded-xl bg-cream p-4">
            {url ? (
              <QRCodeSVG value={url} size={168} bgColor="#fdf6ec" fgColor="#1a1414" level="M" />
            ) : null}
          </div>
          <p className="mt-4 break-all text-xs text-cream/60">{url}</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={tryShare}
              className="rounded-full border border-gold/45 bg-gold/10 px-5 py-2 text-sm text-gold transition hover:bg-gold/20"
            >
              {copied ? 'Lidhja u kopjua' : 'Ndaje'}
            </button>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cream/20 px-5 py-2 text-sm text-cream/85 transition hover:bg-cream/10"
            >
              WhatsApp
            </a>
            <a
              href={tg}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cream/20 px-5 py-2 text-sm text-cream/85 transition hover:bg-cream/10"
            >
              Telegram
            </a>
            <a
              href={mail}
              className="rounded-full border border-cream/20 px-5 py-2 text-sm text-cream/85 transition hover:bg-cream/10"
            >
              Email
            </a>
          </div>

          {config.hashtag ? (
            <p className="mt-6 text-xs uppercase tracking-[0.32em] text-gold/85">
              {config.hashtag}
            </p>
          ) : null}
        </div>

        <p className="script mt-10 text-3xl text-rose">Me dashuri</p>
      </div>
    </section>
  );
}
