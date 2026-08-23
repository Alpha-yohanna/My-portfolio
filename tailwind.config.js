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
          DEFAULT: "#f28c28",
          soft: "#f6a555",
          dim: "#b3651c",
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
        glass: "0 1px 0 0 rgba(255,255,255,0.1) inset, 0 12px 48px -12px rgba(0,0,0,0.7)",
        "accent-glow": "0 0 0 1px rgba(242,140,40,0.4), 0 0 32px -4px rgba(242,140,40,0.35)",
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
