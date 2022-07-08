module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
  ],
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-fluid-type"), require("daisyui")],
  corePlugins: {
    fontSize: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "IBM Plex Sans",
          "ui-sans-serif",
        ],
        serif: [
          "ui-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
        ],
      },
    },
  },
  daisyui: {
    themes: [
      "night",
      "cyberpunk",
    ],
    darkTheme: "night", // this will be the default dark theme
  },
};
