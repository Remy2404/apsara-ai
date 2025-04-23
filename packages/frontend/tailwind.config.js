/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [
    require("nativewind/preset")
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Default primary blue
          dark: '#1E40AF',
          light: '#93C5FD'
        },
        secondary: {
          DEFAULT: '#10B981', // Default secondary green
          dark: '#065F46',
          light: '#6EE7B7'
        },
        background: {
          light: '#FFFFFF',
          dark: '#121212'
        },
        text: {
          light: '#1F2937',
          dark: '#F3F4F6'
        }
      },
      fontFamily: {
        sans: ['Inter-Regular', 'Helvetica', 'Arial', 'sans-serif'],
        bold: ['Inter-Bold', 'Helvetica-Bold', 'Arial-Bold', 'sans-serif']
      }
    },
  },
  plugins: [],
}

