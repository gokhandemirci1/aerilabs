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
        "void-black": "#08090c",
        "deep-space-blue": "#0E1A2B",
        "neon-cyan": "#27E0E6",
        "electric-purple": "#8B5CF6",
        "soft-white": "#EDEDED",
      },
      backgroundImage: {
        "signature-gradient": "linear-gradient(135deg, #27E0E6 0%, #8B5CF6 100%)",
      },
    },
  },
  plugins: [],
};
export default config;






