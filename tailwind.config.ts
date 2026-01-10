import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          900: '#0d1117',
          850: '#0f1520',
          800: '#161b22',
          700: '#21262d',
        },
        fg: {
          100: '#f0f6fc',
          200: '#c9d1d9',
          300: '#8b949e',
        },
        accent: {
          500: '#2f81f7',
          600: '#1f6feb',
          700: '#0b58d0',
        },
        success: {
          500: '#3fb950',
        },
        warn: {
          500: '#d29922',
        },
        danger: {
          500: '#f85149',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(47,129,247,0.45), 0 10px 30px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(ellipse at top, rgba(47,129,247,0.12), transparent 55%), radial-gradient(ellipse at bottom, rgba(47,129,247,0.10), transparent 55%)',
      },
    },
  },
  plugins: [],
};

export default config;
