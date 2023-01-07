/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  images: {
    domains: ["chart.googleapis.com"],
  },
  theme: {
    colors: {
      gray1: "#333333",
      gray3: "#828282",
      gray5: "#E0E0E0",
      gray6: "#F2F2F2",
      white: "#ffffff",
      black: "#000000",
      bgcolor: "#ffffff",
    },
    extend: {
      fontFamily: {
        mono: ["Roboto Mono"],
        normal: ["Roboto"],
      },
    },
  },
  plugins: [],
};
