/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
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
