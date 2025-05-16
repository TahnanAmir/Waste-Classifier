/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5e6',
          100: '#c2e5c2',
          200: '#9ad49a',
          300: '#71c371',
          400: '#52b652',
          500: '#3ca73c',
          600: '#349834',
          700: '#2a862a',
          800: '#217421',
          900: '#0d550d',
        },
      },
    },
  },
  plugins: [],
}; 