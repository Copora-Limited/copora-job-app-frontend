/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class", // or 'media' for media-query-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        azoSansLight: ["var(--font-light)", ...fontFamily.sans],
        azoSansMedium: ["var(--font-medium)", ...fontFamily.sans],
        azoSansRegular: ["var(--font-regular)", ...fontFamily.sans],
        azoSansBold: ["var(--font-bold)", ...fontFamily.sans],
        azoSansItalic: ["var(--font-italic)", ...fontFamily.sans],
      },
      colors: {
        primary: "#101828",
        appGreen: "#247A84",
        secondary: "#032541",
        appMuted: "#667085",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        fadeOut: "fadeOut 0.3s ease-out", // Define fadeOut animation
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
