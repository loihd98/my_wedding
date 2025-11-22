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
        primary: {
          50: "#fdf4f5",
          100: "#fce8eb",
          200: "#f9d5dc",
          300: "#f4b3c1",
          400: "#ed869d",
          500: "#e3607e",
          600: "#cf3d64",
          700: "#b02f51",
          800: "#932948",
          900: "#7d2642",
        },
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#baa58a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        aquarelle: ["var(--font-aquarelle)", "cursive"],
        belinda: ["var(--font-belinda)", "cursive"],
        katty: ["var(--font-katty)", "cursive"],
        "madam-ghea": ["var(--font-madam-ghea)", "cursive"],
        mallong: ["var(--font-mallong)", "cursive"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
        showcase: ["var(--font-showcase)", "sans-serif"],
        signora: ["var(--font-signora)", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        scrollDown: "scrollDown 20s linear infinite",
        scrollUp: "scrollUp 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        heartFly: {
          "0%": { top: "0", opacity: "1" },
          "90%": { top: "-500px", opacity: "0.7" },
          "100%": { top: "-600px", opacity: "0" },
        },
        heartSway: {
          "0%": { marginLeft: "0px" },
          "100%": { marginLeft: "50px" },
        },
        textShadow: {
          "0%, 100%": { textShadow: "0 -2px 8px rgba(0,0,0,0.15)" },
          "50%": { textShadow: "0 4px 12px rgba(0,0,0,0.4)" },
        },
        scrollDown: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
        scrollUp: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        masonryScrollDown: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(50%)" },
        },
        masonryScrollUp: {
          "0%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
