/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--color-bg)',
          card: 'var(--color-bg-card)',
          hover: 'var(--color-bg-card-hover)',
        },
        border: 'var(--color-border)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          dim: 'var(--color-primary-dim)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          dim: 'var(--color-accent-dim)',
        },
        creational: 'var(--color-creational)',
        structural: 'var(--color-structural)',
        behavioral: 'var(--color-behavioral)',
        dim: 'var(--color-text-dim)',
      },
      fontFamily: {
        display: ['Outfit', 'Noto Sans SC', 'sans-serif'],
        body: ['Noto Sans SC', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
