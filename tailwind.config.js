/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/dist/flowbite.min.js"],
  theme: {
    container:{
      center:true,
      padding:'10px'
    },
    extend: {},
  },
  plugins: [],
  darkMode:'false'
}

