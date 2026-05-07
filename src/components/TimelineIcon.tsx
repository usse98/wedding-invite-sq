import type { TimelineIcon as IconKey } from '@/lib/config';

interface Props {
  name: IconKey;
  className?: string;
}

/**
 * Inline gold-line icons for each moment of the day. Designed at 64×64
 * with stroke-only paths so they read as elegant watercolor marks.
 * Any moment can be replaced with a real watercolor PNG by setting
 * `image` on the config schedule entry — see Timeline.tsx.
 */
export default function TimelineIcon({ name, className }: Props) {
  const stroke = 'currentColor';
  const sw = 1.3;
  const common = {
    className,
    width: 56,
    height: 56,
    viewBox: '0 0 64 64',
    fill: 'none' as const,
    stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true
  };

  switch (name) {
    case 'arrival':
      // Castle silhouette + soft wave
      return (
        <svg {...common}>
          <path strokeWidth={sw} d="M14 42V26l4-3 4 3v16M30 42V22l4-3 4 3v20M46 42V28l4-3 4 3v14" />
          <path strokeWidth={sw} d="M10 42h44" />
          <path strokeWidth={sw * 0.9} d="M8 50q6-3 12 0t12 0t12 0t12 0" opacity="0.7" />
        </svg>
      );
    case 'wait':
      // Lake reflection + sun
      return (
        <svg {...common}>
          <circle strokeWidth={sw} cx="32" cy="22" r="7" />
          <path strokeWidth={sw} d="M32 9v3M32 32v3M19 22h3M42 22h3M22 12l2 2M40 12l-2 2" />
          <path strokeWidth={sw * 0.9} d="M10 46q6-3 12 0t12 0t12 0t12 0M8 53q6-3 12 0t12 0t12 0t12 0" opacity="0.7" />
        </svg>
      );
    case 'ceremony':
      // Two interlocking rings with a sparkle
      return (
        <svg {...common}>
          <circle strokeWidth={sw} cx="25" cy="36" r="13" />
          <circle strokeWidth={sw} cx="39" cy="36" r="13" />
          <path strokeWidth={sw * 0.9} d="M32 14v6M28 17l4 3 4-3" />
        </svg>
      );
    case 'toast':
      // Two champagne flutes
      return (
        <svg {...common}>
          <path strokeWidth={sw} d="M22 12l4 18a4 4 0 0 0 8 0l4-18" />
          <path strokeWidth={sw} d="M22 12h20" />
          <path strokeWidth={sw} d="M30 50v-12M22 54h16" />
          <path strokeWidth={sw * 0.7} d="M48 18l3-3M48 22h4M52 26l-3-1" opacity="0.7" />
        </svg>
      );
    case 'lunch':
      // Plate + utensils
      return (
        <svg {...common}>
          <circle strokeWidth={sw} cx="32" cy="34" r="14" />
          <circle strokeWidth={sw * 0.8} cx="32" cy="34" r="9" />
          <path strokeWidth={sw} d="M14 12v14a3 3 0 0 0 3 3M50 12v22M50 22h-4a2 2 0 0 1 0-4h4" />
        </svg>
      );
    case 'terrace':
      // Lantern + lake horizon
      return (
        <svg {...common}>
          <path strokeWidth={sw} d="M32 12v3M28 18h8l-1 14h-6z" />
          <path strokeWidth={sw} d="M30 32v4M34 32v4" />
          <path strokeWidth={sw * 0.7} d="M32 22v6" opacity="0.7" />
          <path strokeWidth={sw * 0.9} d="M10 48h44M8 54q6-3 12 0t12 0t12 0t12 0" opacity="0.75" />
        </svg>
      );
    case 'cake':
      // Three-tier cake
      return (
        <svg {...common}>
          <path strokeWidth={sw} d="M22 50h20v-8H22zM18 42h28v-8H18zM14 34h36v-8H14z" />
          <path strokeWidth={sw} d="M32 14v8" />
          <path strokeWidth={sw * 0.8} d="M30 14q1-3 2-4q1 1 2 4" />
          <path strokeWidth={sw * 0.9} d="M14 50h36" />
        </svg>
      );
    case 'dance':
      // Music note + heart
      return (
        <svg {...common}>
          <path strokeWidth={sw} d="M22 44V20l16-4v22" />
          <ellipse strokeWidth={sw} cx="20" cy="46" rx="4" ry="3" />
          <ellipse strokeWidth={sw} cx="36" cy="42" rx="4" ry="3" />
          <path strokeWidth={sw * 0.8} d="M48 18a3 3 0 0 1 6 0c0 3-3 5-3 5s-3-2-3-5z" opacity="0.85" />
        </svg>
      );
    case 'farewell':
      // Crescent moon + stars
      return (
        <svg {...common}>
          <path
            strokeWidth={sw}
            d="M40 16a16 16 0 1 0 8 28 12 12 0 0 1-8-28z"
          />
          <path strokeWidth={sw * 0.8} d="M16 18l1.5 3 3 .5-2.2 2 .6 3-2.9-1.6-2.9 1.6.6-3-2.2-2 3-.5z" opacity="0.85" />
          <path strokeWidth={sw * 0.7} d="M50 50l1 2 2 .5-1.5 1.3.4 2-1.9-1-1.9 1 .4-2L47 52.5l2-.5z" opacity="0.75" />
        </svg>
      );
  }
}
