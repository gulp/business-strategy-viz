/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        // Strategic area colors
        'red': '#D9534F',
        'red-light': '#F8D7DA',
        'green': '#5CB85C',
        'green-light': '#DFF0D8',
        'blue': '#428BCA',
        'blue-light': '#D9EDF7',
        'orange': '#F0AD4E',
        'orange-light': '#FCF8E3',
        
        // App theme colors
        'dark-bg': '#121212',
        'card-bg': '#1e1e1e',
        'aksiyon-bg': '#000000',
        'static-amac-bg': '#111111',
        'light-text': '#f0f0f0',
        'dark-text': '#212529',
        'medium-text': '#aaaaaa',
        'accent-text': '#ffffff',
      },
      fontFamily: {
        'main': ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
      },
      spacing: {
        'card': '20px',
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 6px 20px rgba(0, 0, 0, 0.35)',
        'card-stack': '0 8px 25px rgba(0, 0, 0, 0.4)',
      },
      transitionDuration: {
        'theme': '300ms',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};