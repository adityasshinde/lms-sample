/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "0074BA": "#207DB7",
        "47D7BC": "#266697",
        "2B527A": "#2B527A",
        "207EB8": "#207EB8"
      },
      fontFamily: {
        global: ["Montserrat", "sans-serif"],
        prev: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
