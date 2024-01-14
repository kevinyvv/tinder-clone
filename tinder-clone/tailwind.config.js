/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-pattern': "linear-gradient(to right bottom, rgba(0,0,0,0.5), rgba(156,163,175,0.1)),url('../src/images/6e9794bcedeecf5a8f8f41338a2a7345.webp')",
      }},
    fontFamily: {
      readex: ['Readex Pro', "sans-serif"]
    },
  },
  plugins: [],
  important: true,
}

