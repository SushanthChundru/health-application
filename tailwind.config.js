/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8edf5',
          100: '#c5d1e6',
          200: '#94a8cf',
          300: '#5e7ab0',
          400: '#365894',
          500: '#1d3d78',
          600: '#142d63',
          700: '#0f2455',
          800: '#071B49',
          900: '#050f33',
        },
        accent: {
          50: '#e6f7fc',
          100: '#b8e9f7',
          200: '#7dd6ee',
          300: '#42c2e3',
          400: '#26A9D6',
          500: '#1b8dbb',
          600: '#16739a',
          700: '#125a78',
          800: '#0d4261',
          900: '#082b40',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(38, 169, 214, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(38, 169, 214, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
