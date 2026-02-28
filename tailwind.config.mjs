/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // All colors are CSS variables so they switch instantly on theme toggle
        "site-bg": "var(--color-bg)",
        "site-bg2": "var(--color-bg2)",
        "site-bg3": "var(--color-bg3)",
        "site-border": "var(--color-border)",
        "site-text": "var(--color-text)",
        "site-muted": "var(--color-muted)",
        "site-accent": "var(--color-accent)",
        "site-accent2": "var(--color-accent2)",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        mono: ['"DM Mono"', "monospace"],
        sans: ['"DM Sans"', "sans-serif"],
      },
      fontSize: {
        "2xs": "0.65rem",
        xs: "0.72rem",
      },
    },
  },
  plugins: [],
};
