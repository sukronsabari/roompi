/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        'JetBrains Mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        navbar: 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.125);',
      },
      height: {
        screenCustom: 'calc(100vh - 62px)',
      },
      colors: {
        primary: '#0284c7',
        dark: '#1e293b',
        paragraph: '#475569',
      },
      screens: {
        screen450: '450px',
      },
    },
  },
  plugins: [],
};
