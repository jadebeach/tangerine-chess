/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'board-light': '#e8dcc0',
        'board-dark': '#a67c52',
        'primary': '#4a90e2',
        'background': '#f0ebe3',
      },
      fontFamily: {
        'serif': ['"Crimson Pro"', 'Georgia', 'serif'],
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
