/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4F46E5',
          dark: '#6366F1',
        },
        secondary: {
          light: '#10B981',
          dark: '#34D399',
        },
        accent: {
          light: '#F59E0B',
          dark: '#FBBF24',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'hover': 'hover 1s ease-in-out infinite',
      },
      keyframes: {
        hover: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
} 