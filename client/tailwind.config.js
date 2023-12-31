const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "heavy-pink": "#f875aa",
        "section-pink": "#f3cdcdc2",
        "section-blue": "#aedefc",
        "primary-pink": "#ffdfdf",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        pinkTheme: {
          extend: "light",
          colors: {
            primary: { DEFAULT: "#f875aa", foreground: "#ffffff" },
          },
        },
      },
    }),
  ],
};
