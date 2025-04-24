/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./themes/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10a37f',
          50: '#eefbf7',
          100: '#d6f5ea',
          200: '#b0ead7',
          300: '#81d9be',
          400: '#4dc29e',
          500: '#10a37f',
          600: '#0c8b6d',
          700: '#0b705a',
          800: '#0b5a49',
          900: '#0a4a3d',
          950: '#062c24',
        },
        secondary: {
          DEFAULT: '#343541',
          50: '#f2f2f3',
          100: '#e5e5e7',
          200: '#d0d0d3',
          300: '#aeaeb4',
          400: '#87878f',
          500: '#6b6b74',
          600: '#5a5a62',
          700: '#4c4c52',
          800: '#343541',
          900: '#2b2b36',
          950: '#18181f',
        },
      },
      fontFamily: {
        sans: ['Inter-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

