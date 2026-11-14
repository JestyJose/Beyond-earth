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
          black: "#080512",      // Deep midnight violet background
          deep: "#0D081B",       // Layered midnight violet
          navy: "#110B20",       // Dark violet surface panel
          surface: "#110B20",    // Canonical Surface
          card: "#170F2C",       // Raised card surface
          cardHover: "#20153D",  // Raised hover
          border: "rgba(168, 85, 247, 0.18)", // Thin violet border
          borderLight: "rgba(196, 181, 253, 0.28)",
          hover: "rgba(168, 85, 247, 0.14)",
          primary: "#A855F7",    // Primary violet
          secondary: "#8B5CF6",  // Secondary purple
          accent: "#C4B5FD",     // Accent lavender
          violet: "#A855F7",
          violetGlow: "rgba(168, 85, 247, 0.45)",
          purple: "#8B5CF6",
          lavender: "#C4B5FD",
          cyan: "#C4B5FD",       // Harmonized accent lavender
          cyanGlow: "rgba(168, 85, 247, 0.4)",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
          text: "#F5F0FF",       // Premium soft lavender white
          muted: "#A99BBF"       // Muted lavender gray
        }
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      },
      boxShadow: {
        'violet-glow': '0 0 25px -4px rgba(168, 85, 247, 0.45)',
        'cyan-glow': '0 0 25px -4px rgba(168, 85, 247, 0.4)',
        'lavender-glow': '0 0 20px -3px rgba(196, 181, 253, 0.4)',
        'glass': '0 8px 32px 0 rgba(8, 5, 18, 0.55)',
        'glass-hover': '0 12px 35px -8px rgba(168, 85, 247, 0.3)'
      },
      backgroundImage: {
        'space-radial': 'radial-gradient(circle at 50% 10%, rgba(168, 85, 247, 0.16), transparent 55%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.12), transparent 45%)',
        'nebula-violet': 'radial-gradient(circle at 20% 15%, rgba(139, 92, 246, 0.18), transparent 45%), radial-gradient(circle at 80% 30%, rgba(168, 85, 247, 0.14), transparent 50%), radial-gradient(circle at 50% 85%, rgba(196, 181, 253, 0.08), transparent 55%)'
      }
    },
  },
  plugins: [],
}
