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
		extend: {},
	},
	plugins: [],
};
