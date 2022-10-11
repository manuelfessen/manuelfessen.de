module.exports = {
	content: [
	  "./public/**/*.html",
	  "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
	],
	plugins: [require("@tailwindcss/typography"), require("tailwindcss-fluid-type"), require("daisyui")],
	corePlugins: {
	  fontSize: false,
	},
	daisyui: {
	  themes: [
		"black",
		"light",
	  ],
	  darkTheme: "black", // this will be the default dark theme
	},
  };
  