'use client';

import { useState } from 'react';
import { config } from '@/lib/config';

function toICSDate(iso: string) {
  // 2026-09-19T11:30:00+02:00 -> 20260919T093000Z (UTC)
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}

function buildICS() {
  const dtStart = toICSDate(config.dateISO);
  const dtEnd = toICSDate(config.endISO);
  const uid = `${config.dateISO}-${config.bride}-${config.groom}@invite`.replace(/\s+/g, '-');
  const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

  const summary = `${config.bride} & ${config.groom} — Dasma`;
  const description = `Ceremonia në ${config.timeLabel.replace(/^Ora\s*/, '')} në ${config.venue.name}.\nJeni mes njerëzve më të rëndësishëm për ne: ju presim.`;
  const location = `${config.venue.name}, ${config.venue.address}`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kristjana e Houssine//Ftesa Dasme//SQ',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escape(summary)}`,
    `DESCRIPTION:${escape(description)}`,
    `LOCATION:${escape(location)}`,
    `GEO:${config.venue.lat};${config.venue.lng}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escape('Kujtues: ' + summary)}`,
    'TRIGGER:-P1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  return lines.join('\r\n');
}

function googleCalendarUrl() {
  const dtStart = toICSDate(config.dateISO);
  const dtEnd = toICSDate(config.endISO);
  const text = encodeURIComponent(`${config.bride} & ${config.groom} — Dasma`);
  const details = encodeURIComponent(
    `Ceremonia në ${config.timeLabel.replace(/^Ora\s*/, '')} në ${config.venue.name}.`
  );
  const location = encodeURIComponent(`${config.venue.name}, ${config.venue.address}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dtStart}/${dtEnd}&details=${details}&location=${location}`;
}

export default function AddToCalendar() {
  const [open, setOpen] = useState(false);

  const downloadICS = () => {
    const blob = new Blob([buildICS()], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.bride}-e-${config.groom}-dasma.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  return (
    <div className="relative inline-flex">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-5 py-2 text-sm text-gold transition hover:bg-gold/20"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3.5 9h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        Shto në kalendar
      </button>

      {open && (
        <div
          role="menu"
          className="glass absolute left-1/2 top-[calc(100%+10px)] z-30 w-56 -translate-x-1/2 rounded-xl p-2 text-sm shadow-xl"
        >
          <button
            role="menuitem"
            onClick={downloadICS}
            className="block w-full rounded-lg px-3 py-2 text-left text-cream/85 hover:bg-cream/10"
          >
            Apple · Outlook (.ics)
          </button>
          <a
            role="menuitem"
            href={googleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="block w-full rounded-lg px-3 py-2 text-left text-cream/85 hover:bg-cream/10"
          >
            Google Calendar
          </a>
        </div>
      )}
    </div>
  );
}
