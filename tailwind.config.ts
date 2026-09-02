import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#f6dbe2",
        sage: "#c2d772",
        cream: "#fff9e6",
        coral: "#f6c5c1",
        paper: "#ffffff",
        ink: "#1f2b18",
        "ink-soft": "#45543c",
        pistachio: "#c2d772",
        pistachioDeep: "#a8b85a",
        "sage-deep": "#8a9e42",
        peach: "#f6c5c1",
        line: "rgba(31, 43, 24, 0.14)",
      },
      boxShadow: {
        sticker: "0 5px 0 rgba(31, 43, 24, 0.16)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;