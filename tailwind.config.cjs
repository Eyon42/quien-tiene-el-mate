/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "412px",
      sm: "670px",
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#DA5598",
        secondary: "#5D0EC1",
        accent: "#52FCA9",
        dark: "#111729",
      },
    },
  },
  plugins: [],
};
