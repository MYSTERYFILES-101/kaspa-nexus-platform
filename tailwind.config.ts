import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors (Cyan)
        primary: {
          DEFAULT: "#00D4FF",
          light: "#33DDFF",
          dark: "#00A8CC",
        },
        // Secondary Colors (Magenta/Purple)
        secondary: {
          DEFAULT: "#9D4EDD",
          light: "#B366E6",
          dark: "#7B2CBF",
        },
        // Background Colors
        background: {
          start: "#0A1628",
          end: "#1A1A2E",
          card: "rgba(255, 255, 255, 0.05)",
        },
        // Status Colors
        success: "#00FF88",
        error: "#FF4444",
        warning: "#FFB800",
        // Text Colors
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0B0",
          muted: "#6B7280",
        },
        // Token Change Colors
        positive: "#49DE80",
        negative: "#F87171",
        // Glass Colors
        glass: {
          bg: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)",
          shadow: "rgba(0, 212, 255, 0.1)",
        },
      },
      backgroundImage: {
        "gradient-main": "linear-gradient(135deg, #0A1628 0%, #1A1A2E 100%)",
        "gradient-primary": "linear-gradient(135deg, #00D4FF 0%, #9D4EDD 100%)",
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "glass-glow": "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 212, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "glow-primary": "0 0 20px rgba(0, 212, 255, 0.3)",
        "glow-secondary": "0 0 20px rgba(157, 78, 221, 0.3)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 212, 255, 0.4)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
