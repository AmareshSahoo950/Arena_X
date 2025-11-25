/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-cyan': '#00ffff',
        'cyber-magenta': '#ff00ff',
        'cyber-green': '#00ff00',
        'cyber-yellow': '#ffff00',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
        'neon-magenta': '0 0 10px #ff00ff, 0 0 20px #ff00ff',
        'neon-green': '0 0 10px #00ff00, 0 0 20px #00ff00',
        'neon-yellow': '0 0 10px #ffff00',
      },
    },
  },
  plugins: [],
}

