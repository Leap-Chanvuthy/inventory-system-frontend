/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors : {
        black1 : '#1D242E',
        black2 : '#283342',
        red : '#F0483E',
        green : '#01A768',
        skyblue : '#03A9F5',
        yellow : '#FED600',
        tailgreen : '#009099',
      }
    },
  },
  plugins: [flowbite.plugin(),],
}
