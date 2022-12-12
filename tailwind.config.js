module.exports = {
  important: true,
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Merriweather: ["Merriweather"],
        Poppin: ["Poppin"],
      },
    },
  },
  plugins: [],
};
