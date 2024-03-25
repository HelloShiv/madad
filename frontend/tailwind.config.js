/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#171717',
        'custom-white': '#343434',
      },
      fontFamily: {
        dogica: ['Dogica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
