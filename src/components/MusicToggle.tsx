'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { config } from '@/lib/config';

const FADE_MS = 350;
const TARGET_VOLUME = 0.55;

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const a = new Audio(config.musicSrc);
    a.loop = true;
    a.volume = 0;
    a.preload = 'none';
    a.addEventListener('error', () => setAvailable(false));
    audioRef.current = a;
    return a;
  }, []);

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const a = audioRef.current;
    if (!a) return;
    if (fadeRef.current) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
    const start = a.volume;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / FADE_MS);
      a.volume = start + (target - start) * k;
      if (k < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
        onDone?.();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(
    () => () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      audioRef.current?.pause();
      audioRef.current = null;
    },
    []
  );

  const toggle = async () => {
    const a = ensureAudio();
    if (a.paused) {
      try {
        a.volume = 0;
        await a.play();
        setPlaying(true);
        fadeTo(TARGET_VOLUME);
      } catch {
        setAvailable(false);
      }
    } else {
      fadeTo(0, () => {
        a.pause();
        setPlaying(false);
      });
    }
  };

  if (!available) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Ndalo muzikën' : 'Luaj muzikën'}
      aria-pressed={playing}
      className="fixed right-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-gold/45 bg-ink/65 text-gold backdrop-blur-md transition hover:bg-ink/85"
    >
      {playing ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
