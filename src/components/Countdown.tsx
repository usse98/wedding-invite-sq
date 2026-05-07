'use client';

import { useEffect, useState } from 'react';
import { config } from '@/lib/config';
import AddToCalendar from './AddToCalendar';

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: ms === 0, ms };
}

export default function Countdown() {
  const target = new Date(config.dateISO).getTime();
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false, ms: 0 });

  useEffect(() => {
    setT(diff(target));
    let id: number | undefined;
    const start = () => {
      stop();
      id = window.setInterval(() => setT(diff(target)), 1000);
    };
    const stop = () => {
      if (id !== undefined) {
        clearInterval(id);
        id = undefined;
      }
    };
    const onVis = () => {
      if (document.hidden) {
        stop();
      } else {
        setT(diff(target));
        start();
      }
    };
    start();
    document.addEventListener('visibilitychange', onVis);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [target]);

  const cells: [string, number][] = [
    ['Ditë', t.days],
    ['Orë', t.hours],
    ['Minuta', t.minutes],
    ['Sekonda', t.seconds]
  ];

  // Soft milestone label
  const milestone = (() => {
    if (t.done) return 'Sot është dita e madhe';
    if (t.days === 0) return 'Mungojnë vetëm pak orë';
    if (t.days <= 7) return 'Mungon shumë pak';
    if (t.days <= 30) return 'Përgatitjet e fundit';
    if (t.days <= 100) return 'Po afrohet';
    return 'Numërimi mbrapsht';
  })();

  return (
    <section id="countdown" className="relative z-10 px-6 pb-24">
      <div className="mx-auto max-w-2xl">
        <div className="glass mx-auto rounded-2xl px-5 py-6 sm:px-8">
          <p className="eyebrow text-center">{milestone}</p>
          <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-4">
            {cells.map(([label, val]) => (
              <div key={label} className="text-center">
                <div className="display text-3xl tabular-nums text-transparent gold-text sm:text-5xl">
                  {String(val).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-cream/60">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <AddToCalendar />
          </div>
        </div>
      </div>
    </section>
  );
}
