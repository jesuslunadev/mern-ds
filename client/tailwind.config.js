/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        turquoise: '#40E0D0',
        'dark-turquoise': '#30C6B0',
      },
      fontFamily: {
        sans: ['Montserrat'],
      },
    },
  },
  plugins: [],
}

