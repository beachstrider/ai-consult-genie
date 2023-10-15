/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",

  ],
  variants: {
    display: ['responsive', 'group-hover', 'group-focus'],
  },
  theme: {
    extend: {},
   },
  plugins: [
    require('@tailwindcss/forms'),
    // require('flowbite/plugin'),
    // require('tailwind-scrollbar'),
  ],
}

