/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alenia': {
          'primary': '#00ff88',
          'secondary': '#0066ff',
          'accent': '#ff0066',
          'dark': '#0a0a0a',
          'light': '#f8fafc',
          // Variaciones con opacidad para efectos glow
          'primary-10': 'rgba(0, 255, 136, 0.1)',
          'primary-20': 'rgba(0, 255, 136, 0.2)',
          'primary-30': 'rgba(0, 255, 136, 0.3)',
          'primary-50': 'rgba(0, 255, 136, 0.5)',
          'secondary-10': 'rgba(0, 102, 255, 0.1)',
          'secondary-20': 'rgba(0, 102, 255, 0.2)',
          'secondary-30': 'rgba(0, 102, 255, 0.3)',
          'secondary-50': 'rgba(0, 102, 255, 0.5)',
          'accent-10': 'rgba(255, 0, 102, 0.1)',
          'accent-20': 'rgba(255, 0, 102, 0.2)',
          'accent-30': 'rgba(255, 0, 102, 0.3)',
          'accent-50': 'rgba(255, 0, 102, 0.5)',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'sans-serif']
      },
      fontSize: {
        // Escalas tipográficas más dramáticas
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'gradient-slow': 'gradient 15s ease infinite',
        'gradient-fast': 'gradient 5s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'text-reveal': 'text-reveal 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)'
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 30px rgba(0, 255, 136, 0.7), 0 0 60px rgba(0, 255, 136, 0.5)'
          }
        },
        'glow-pulse': {
          '0%, 100%': { 
            filter: 'brightness(1) drop-shadow(0 0 10px rgba(0, 255, 136, 0.5))'
          },
          '50%': { 
            filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(0, 255, 136, 0.8))'
          }
        },
        'text-reveal': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)',
            clipPath: 'inset(0 100% 0 0)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
            clipPath: 'inset(0 0% 0 0)'
          }
        },
        'slide-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-in': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'morph': {
          '0%, 100%': { 
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
          },
          '50%': { 
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%'
          }
        }
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 255, 136, 0.3)',
        'glow-md': '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)',
        'glow-lg': '0 0 30px rgba(0, 255, 136, 0.7), 0 0 60px rgba(0, 255, 136, 0.5)',
        'glow-xl': '0 0 40px rgba(0, 255, 136, 0.8), 0 0 80px rgba(0, 255, 136, 0.6)',
        'glow-secondary': '0 0 20px rgba(0, 102, 255, 0.5), 0 0 40px rgba(0, 102, 255, 0.3)',
        'glow-accent': '0 0 20px rgba(255, 0, 102, 0.5), 0 0 40px rgba(255, 0, 102, 0.3)',
        'glow-multi': '0 0 20px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 102, 255, 0.3), 0 0 60px rgba(255, 0, 102, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
      }
    },
  },
  plugins: [],
}