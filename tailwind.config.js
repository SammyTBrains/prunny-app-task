/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#663191",
      "primary-dark": "#2D1145",
      white: "#fff",
      grey: "#e0e1e2",
      greyDarker: "#a9a9a9",
      black: "#000",
      red: '#FF0000',
    },
    extend: {},
  },
  plugins: [],
}

