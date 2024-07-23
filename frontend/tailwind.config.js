/** @type {import('tailwindcss').Config} */

import withMt from "@material-tailwind/html/utils/withMT";

export default withMt({
  content: ["./index.html", "./src/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
});
