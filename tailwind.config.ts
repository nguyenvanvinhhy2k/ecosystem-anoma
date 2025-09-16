import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // quan trọng!
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }
    },
    animation: {
      'dot1': 'blink 1.5s infinite',
      'dot2': 'blink 1.5s infinite 0.3s',
      'dot3': 'blink 1.5s infinite 0.6s',
    },
  },
  plugins: [],
} satisfies Config;
