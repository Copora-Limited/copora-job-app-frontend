// tailwind.config.js
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class", // or 'media' for media-query-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
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
