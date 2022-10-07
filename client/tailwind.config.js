/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./Layout/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        siteSkin: "#F7E3C5",
        siteYellow: "FEBA02",
        sitegreen: "#5CF8AD",
        siteBlue: "#003585",
        siteGray: "#535068",
        siteLightBlue: "#149DE1",
        textBlack: "#141c3a",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        rubik: ["Rubik Dirt", "cursive"],
      },
      screens: {
        xs: "548px",
      },
      gridTemplateColumns: {
        16: "repeat(auto-fit, minmax(400px, 1fr))",
      },
    },
  },
  plugins: [],
};
