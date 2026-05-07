'use client';

import { config } from '@/lib/config';

export default function Rsvp() {
  const r = config.rsvp;
  const subject = encodeURIComponent(`Konfirmim për dasmën e ${config.bride} & ${config.groom}`);
  const body = encodeURIComponent(
    `Përshëndetje ${config.bride} & ${config.groom},\n\nKonfirmojmë praninë tonë në dasmën e ${config.dateLabel}.\n\nNumri i personave: \nShënime / nevoja ushqimore: \n\nMe dashuri,\n`
  );
  const mail = r.email ? `mailto:${r.email}?subject=${subject}&body=${body}` : null;
  const wa = r.whatsapp
    ? `https://wa.me/${r.whatsapp}?text=${encodeURIComponent(
        `Përshëndetje! Konfirmojmë praninë tonë në dasmën tuaj të ${config.dateLabel}.`
      )}`
    : null;

  // Highlight the deadline date inside the intro copy.
  const introParts = r.intro.split(r.deadlineLabel);

  return (
    <section id="rsvp" className="section-bed relative z-10 px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{r.eyebrow}</p>
        <h2 className="display mt-3 text-4xl gold-text sm:text-5xl">{r.title}</h2>
        <div className="divider mx-auto mt-4 w-24" />

        <p className="mt-8 text-base leading-relaxed text-cream/90 sm:text-lg">
          {introParts[0]}
          <span className="text-gold">{r.deadlineLabel}</span>
          {introParts[1] ?? ''}
        </p>

        {r.note ? <p className="mt-4 text-sm text-cream/70">{r.note}</p> : null}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {mail ? (
            <a
              href={mail}
              className="rounded-full border border-gold/45 bg-gold/10 px-5 py-2 text-sm text-gold transition hover:bg-gold/20"
            >
              Konfirmo me email
            </a>
          ) : null}
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cream/20 px-5 py-2 text-sm text-cream/85 transition hover:bg-cream/10"
            >
              Konfirmo në WhatsApp
            </a>
          ) : null}
          {!mail && !wa ? (
            <p className="text-sm text-cream/65">
              Do t'ju kontaktojmë drejtpërdrejt me detajet për konfirmim.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
