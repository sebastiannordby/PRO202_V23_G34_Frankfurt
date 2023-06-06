/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        primary: "#96608e"
      },
      animation: {
        grow: 'grow 2.5s ease-in-out forwards',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0) ' },
          '100%': { transform: 'scale(1) ' },
        },
      },
    },
  },
  plugins: [],
}
