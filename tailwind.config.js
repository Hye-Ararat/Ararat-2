const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-poppins)", ...fontFamily.serif],
        sans: ['var(--font-inter)', ...fontFamily.sans],
      }
    },
  colors: {
    dark: "#0d141d"
  }
  },
  darkMode: "media",
  plugins: [
    require("flowbite/plugin")
  ],
}
