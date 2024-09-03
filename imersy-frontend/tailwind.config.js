/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'plex-mono': ['"IBM Plex Mono"', 'monospace'],
      'inter': ['"Inter"', 'sans-serif'],
    },
    colors: {
      "blue": {
        1 : "#2B4B9C",
        2 : "#467DCF",
        3 : "#3065EE"
      },
      white: "#ffffff",
      gray: "#CDCDCD"
    },
    extend: {},
  },
  plugins: [],
}