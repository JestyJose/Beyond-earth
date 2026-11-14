/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: "#05070D",
          deep: "#080C16",
          navy: "#0B111E",
          card: "#0F172A",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.12)",
          cyan: "#00F0FF",
          cyanGlow: "rgba(0, 240, 255, 0.35)",
          violet: "#8B5CF6",
          violetGlow: "rgba(139, 92, 246, 0.35)",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
          muted: "#94A3B8"
        }
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(0, 240, 255, 0.3)',
        'violet-glow': '0 0 25px -5px rgba(139, 92, 246, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      backgroundImage: {
        'space-radial': 'radial-gradient(circle at 50% 10%, rgba(139, 92, 246, 0.12), transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 240, 255, 0.08), transparent 40%)'
      }
    },
  },
  plugins: [],
}
