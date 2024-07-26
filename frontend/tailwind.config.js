/** @type {import('tailwindcss').Config} */

const withMt = require("@material-tailwind/html/utils/withMT");
module.exports = withMt({
  content: ["./index.html", "./src/**/*.{ts,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#075755",
      },
      animation: {
        typewriter:
          "typewriter 4s steps(44) 1s 1 normal both, blinkTextCursor 500ms steps(44) infinite normal",
      },
      keyframes: {
        typewriter: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blinkTextCursor: {
          "0%": { "border-color": "transparent" },
          "50%": { "border-color": "black" },
          "100%": { "border-color": "transparent" },
        },
      },
    },
  },
  plugins: [],
});
