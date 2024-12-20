/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      opacity: {
        '70': '0.7',
      },
      colors: {
        'custom-blue': '#120b7d',
        'custom-hover': '#0a0e52', // Cor para o hover
        'custom-white': '#ffffff', // Para textos e fundos claros no header
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #120b7d, #120b7d)', // Substituindo por azul sólido
        'custom-hover-gradient': 'linear-gradient(135deg, #0a0e52, #120b7d)', // Substituindo por tons azulados
      },
      boxShadow: {
        'custom': '0px 4px 8px rgba(0, 0, 0, 0.15)',
        'hover': '0px 6px 12px rgba(0, 0, 0, 0.2)',
        'active': '0px 3px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '12px': '12px',
      },
      transitionProperty: {
        'all': 'all',
      },
      // Adicionando configurações para animações
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.focus-none': {
          outline: 'none',
        },
      });
    },
  ],
}
