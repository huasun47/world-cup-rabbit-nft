/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#eb1484",
        secondary: "#c81cc5",
        "dark-bg": "#24252d",
        "dark-card": "#2A2D3A",
      },
      borderColor: {
        primary: "#eb1484",
      },
      backgroundColor: {
        primary: "#eb1484",
        secondary: "#c81cc5",
        "dark-bg": "#24252d",
        "dark-card": "#2A2D3A",
        "dark-input": "#1b1a21",
      },
      backgroundImage: {
        "gradient-primary": `linear-gradient(101.12deg,#eb1484 27.35%,#c91cc3 99.99%,#c81cc5 100%);`,
      },
    },
  },
  plugins: [],
};
