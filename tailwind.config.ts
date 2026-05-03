import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef5ff",
          500: "#2667ff",
          900: "#0f1f4d"
        }
      }
    }
  },
  plugins: []
};

export default config;
