/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        eva: {
          purple: '#7B2FBE',
          'purple-mid': '#4B0082',
          'purple-dark': '#2D0054',
          'purple-deep': '#1E0035',
          green: '#00FF41',
          'green-bright': '#39FF14',
          red: '#CC2200',
          'red-dark': '#881400',
          orange: '#FF8C00',
          nerv: '#FF6600',
        },
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
