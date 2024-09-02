/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        light: {
          primary: 'rgb(242 240 240)',  // Light color for dark mode
          'primary-subtle': 'rgb(254 252 252)',  // Subtle light mode color
          secondary: 'redrgb(226 232 240)', // Darker color for light mode
          text: '#2d3748', // Text color for light mode
          info: {
            DEFAULT: '#bee3f8', // Info color for light mode
            subtle: '#e2e8f0', // Subtle info color for light mode
          },
          warning: {
            DEFAULT: '#fbd38d', // Warning color for light mode
            subtle: '#fefcbf', // Subtle warning color for light mode
          },
          error: {
            DEFAULT: '#fc8181', // Error color for light mode
            subtle: '#fed7d7', // Subtle error color for light mode
          },
          border: {
            DEFAULT: '#e2e8f0', // Default border color for light mode
            subtle: '#edf2f7', // Subtle border color for light mode
          },
        },
        dark: {
          primary: '#1a202c',  // Dark color for light mode
          'primary-subtle': 'rgb(36 42 53)',  // Subtle dark mode color
          secondary: '#f7fafc', // Lighter color for dark mode
          text: '#edf2f7', // Text color for dark mode
          info: {
            DEFAULT: '#2b6cb0', // Info color for dark mode
            subtle: '#bee3f8', // Subtle info color for dark mode
          },
          warning: {
            DEFAULT: '#d69e2e', // Warning color for dark mode
            subtle: '#fbd38d', // Subtle warning color for dark mode
          },
          error: {
            DEFAULT: '#c53030', // Error color for dark mode
            subtle: '#fc8181', // Subtle error color for dark mode
          },
          border: {
            DEFAULT: '#2d3748', // Default border color for dark mode
            subtle: '#4a5568', // Subtle border color for dark mode
          },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
    },
  },
  plugins: [require('tailwindcss-primeui')]

}
