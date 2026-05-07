import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fdf6ec',
        gold: '#c9a96a',
        deepgold: '#a47e3b',
        rose: '#e8b4bc',
        sage: '#9bb39a',
        ink: '#1a1414'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'Great Vibes', 'cursive']
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out both',
        shimmer: 'shimmer 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
