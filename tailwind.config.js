/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./src/pages/*.html",
	],
	theme: {
		extend: {
			fontFamily: {
				custom: ["CustomFont", "sans-serif"], // Nastavíme nový vlastní font
			},
		},
	},
	plugins: [],
};
