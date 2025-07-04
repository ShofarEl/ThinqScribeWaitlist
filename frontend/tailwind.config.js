/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'thinq-blue': {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#7dd3fc',
          300: '#38bdf8',
          400: '#0ea5e9',
          500: '#017DB0',
          600: '#015382',
          700: '#075985',
          800: '#0c4a6e',
          900: '#164e63',
        },
        'thinq-gradient-start': '#017DB0',
        'thinq-gradient-end': '#015382',
      },
      backgroundImage: {
        'thinq-gradient': 'linear-gradient(135deg, #017DB0 0%, #015382 100%)',
        'thinq-gradient-dark': 'linear-gradient(135deg, #015382 0%, #0c4a6e 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', fontWeight: '800' }],
        'display-md': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'mobile-display-xl': ['3rem', { lineHeight: '1.1', fontWeight: '800' }],
        'mobile-display-lg': ['2.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'mobile-display-md': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
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
      },
    },
  },
  plugins: [],
} 