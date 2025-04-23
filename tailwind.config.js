/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'cyber-black': '#0d0d0e',
          'cyber-dark': '#151821',
          'cyber-blue': '#00eeff',
          'cyber-pink': '#ff0099',
          'cyber-purple': '#9933ff',
          'cyber-green': '#00ff66',
        },
        fontFamily: {
          cyber: ['Orbitron', 'sans-serif'],
          main: ['Inter', 'sans-serif'],
        },
        boxShadow: {
          'neon-blue': '0 0 5px #00eeff, 0 0 20px rgba(0, 238, 255, 0.3)',
          'neon-pink': '0 0 5px #ff0099, 0 0 20px rgba(255, 0, 153, 0.3)',
        },
      },
    },
    plugins: [],
    darkMode: 'class',
  }