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
          DEFAULT: '#0f1021',
          card: '#1a1b2e',
          hover: '#222340',
        },
        border: '#2a2b45',
        primary: {
          DEFAULT: '#00d4aa',
          dim: '#00a88a',
        },
        accent: {
          DEFAULT: '#ff6b35',
          dim: '#cc5529',
        },
        creational: '#00d4aa',
        structural: '#6c8cff',
        behavioral: '#ff6b35',
        dim: '#8888a8',
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
