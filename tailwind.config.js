/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tamnora-react/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      pop: 'Poppins'
    },
    extend: {
      screens: {
        'xs': '490px',
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}