/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          900: '#0b1629',
          800: '#0d1f3c',
          700: '#112447',
        },
        brand: {
          400: '#5bb8ff',
          500: '#3b9eff',
          600: '#2a8aee',
        },
      },
    },
  },
  plugins: [],
}
