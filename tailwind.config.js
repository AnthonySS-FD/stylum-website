/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand Color Tokens ───────────────────────────────────────────
      colors: {
        brand: {
          black:   '#080808',
          surface: '#111111',
          border:  '#1e1e1e',
          muted: '#9d9d9dff',
          dim:     '#888888',
          white:   '#F5F5F0',
          accent:  '#6EC6E6', // Electric lime — streetwear edge
        },
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },

      // ─── Spacing / Sizes ─────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ─── Keyframes ───────────────────────────────────────────────────
      keyframes: {
        'ticker': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':      { transform: 'translate(-5%, -10%)' },
          '20%':      { transform: 'translate(-15%, 5%)' },
          '30%':      { transform: 'translate(7%, -25%)' },
          '40%':      { transform: 'translate(-5%, 25%)' },
          '50%':      { transform: 'translate(-15%, 10%)' },
          '60%':      { transform: 'translate(15%, 0%)' },
          '70%':      { transform: 'translate(0%, 15%)' },
          '80%':      { transform: 'translate(3%, 35%)' },
          '90%':      { transform: 'translate(-10%, 10%)' },
        },
      },
      animation: {
        'ticker': 'ticker 20s linear infinite',
        'grain':  'grain 8s steps(10) infinite',
      },

      // ─── Letter Spacing ──────────────────────────────────────────────
      letterSpacing: {
        'ultra': '0.25em',
        'mega':  '0.4em',
      },
    },
  },
  plugins: [],
};
