/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#F8F8FF',
          100: '#F0F0FF',
          200: '#E6E6FF',
          300: '#D3D3FF',
          400: '#BFBFFF',
          500: '#A6A6FF',
          600: '#8C8CFF',
          700: '#7373FF',
          800: '#5959FF',
          900: '#4040FF',
          950: '#2626FF',
        },
        secondary: {
          50: '#F8F8FF',
          100: '#F0F0FF',
          200: '#E6E6FF',
          300: '#D3D3FF',
          400: '#BFBFFF',
          500: '#A6A6FF',
          600: '#8C8CFF',
          700: '#7373FF',
          800: '#5959FF',
          900: '#4040FF',
          950: '#2626FF',
        },
        accent: {
          50: '#F8F8FF',
          100: '#F0F0FF',
          200: '#E6E6FF',
          300: '#D3D3FF',
          400: '#BFBFFF',
          500: '#A6A6FF',
          600: '#8C8CFF',
          700: '#7373FF',
          800: '#5959FF',
          900: '#4040FF',
          950: '#2626FF',
        },
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(211, 211, 255, 0.15)',
      },
    },
  },
  plugins: [],
};