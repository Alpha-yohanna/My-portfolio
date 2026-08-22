export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#08080a",
          50: "#1a1a1f",
          100: "#131316",
          200: "#0e0e11",
          300: "#08080a",
        },
        ink: {
          DEFAULT: "#f4f3ee",
          dim: "#9a9a94",
        },
        accent: {
          DEFAULT: "#5b5bf0",
          soft: "#8583ff",
          dim: "#3f3fb0",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 9vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 8px 40px -12px rgba(0,0,0,0.6)",
        "accent-glow": "0 0 0 1px rgba(91,91,240,0.4), 0 0 32px -4px rgba(91,91,240,0.35)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
