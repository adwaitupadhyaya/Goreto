/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/html/utils/withMT";

const config = {
  content: ["./index.html", "./src/**/*.{ts,html}"],
  theme: {
    extend: {
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
};

export default withMT(config);
