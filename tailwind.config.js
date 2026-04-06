/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black:   '#0A0A0A',
          surface: '#141414',
          card:    '#1C1C1C',
          border:  '#262626',
          muted:   '#555555',
          dim:     '#AAAAAA',
          white:   '#F0F0F0',
          accent:  '#6EC6E6',
          dark:    '#050505',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        ticker: 'ticker 25s linear infinite',
        float:  'float 4s ease-in-out infinite',
      },
      letterSpacing: {
        ultra: '0.25em',
        mega:  '0.4em',
      },
    },
  },
  plugins: [],
};
