'use client';

import { config } from '@/lib/config';

export default function MapSection() {
  const { lat, lng, name, address } = config.venue;
  const bbox = [lng - 0.01, lat - 0.006, lng + 0.01, lat + 0.006].join(',');
  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const appleUrl = `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  return (
    <section id="mappa" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">Vendi</p>
          <h2 className="display mt-3 text-4xl gold-text sm:text-5xl">Mbi liqen</h2>
          <div className="divider mx-auto mt-4 w-24" />
        </div>

        <div className="mt-10 glass overflow-hidden rounded-2xl">
          <div className="aspect-[16/10] w-full">
            <iframe
              title="Harta e vendit"
              src={osmEmbed}
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>

          <div className="p-5 sm:p-6">
            <p className="display text-2xl text-cream">{name}</p>
            <p className="mt-1 text-sm text-cream/70">{address}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gold/45 bg-gold/10 px-5 py-2 text-sm text-gold transition hover:bg-gold/20"
              >
                Google Maps
              </a>
              <a
                href={appleUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-cream/20 px-5 py-2 text-sm text-cream/85 transition hover:bg-cream/10"
              >
                Apple Maps
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-cream/20 px-5 py-2 text-sm text-cream/85 transition hover:bg-cream/10"
              >
                Waze
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
