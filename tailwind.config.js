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
      "night",
      "cyberpunk",
    ],
    darkTheme: "night", // this will be the default dark theme
  },
};
