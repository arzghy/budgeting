import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#f6dbe2",
        sage: "#c2d772",
        cream: "#f6ffd3",
        coral: "#f6c5c1",
        paper: "#fffdf6",
        ink: "#4a5440",
        "ink-soft": "#7a8470",
        pistachio: "#c2d772",
        pistachioDeep: "#a8b85a",
        "sage-deep": "#a8b85a",
        peach: "#f6c5c1",
        line: "rgba(74, 84, 64, 0.14)",
      },
      boxShadow: {
        sticker: "0 5px 0 rgba(74, 84, 64, 0.16)",
      },
    },
  },
  plugins: [],
};
export default config;