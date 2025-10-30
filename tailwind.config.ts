import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#0A0A0A",
        gray: {
          DEFAULT: "#6B6B6B",
          light: "#E5E5E5",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      letterSpacing: {
        tight: "-0.02em",
        tighter: "-0.04em",
      },
      spacing: {
        "28": "7rem",
        "16": "4rem",
      },
      transitionDuration: {
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
      },
      transitionTimingFunction: {
        "natural": "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 400ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards",
        fadeInUp: "fadeInUp 400ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
