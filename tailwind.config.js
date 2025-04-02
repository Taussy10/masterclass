/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0d6c9a',
        secondary: '#f3cf36',
        tertiary: '#1d6976',
        dark: '#132134',
      },
    },
  },
  plugins: [],
};
