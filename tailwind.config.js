/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette - warm ivory/cream base
        ivory: {
          50: '#FDFCF9',
          100: '#FAF8F3',
          200: '#F5F1E8',
          300: '#EDE7D9',
          400: '#DED4C1',
        },
        // Deep ink blacks
        ink: {
          700: '#2C2825',
          800: '#1F1C19',
          900: '#141210',
          950: '#0A0908',
        },
        // Brand primary - Coral/Terracotta (warm, empowering)
        coral: {
          50: '#FEF5F3',
          100: '#FDE8E3',
          200: '#FBD5CC',
          300: '#F8B8A8',
          400: '#F28B73',
          500: '#E86F50', // Primary
          600: '#D4533A',
          700: '#B1432D',
          800: '#933A29',
          900: '#7A3427',
        },
        // Brand secondary - Teal (accessible, growth)
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6', // Primary
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        // Accent - Ochre/Gold (warmth, achievement)
        ochre: {
          300: '#F4C542',
          400: '#E5A823',
          500: '#D4850F',
          600: '#B8690B',
        },
        // Legacy colors for compatibility
        crimson: {
          400: '#E63946',
          500: '#C1121F',
          600: '#9B0D15',
          700: '#780A10',
        },
        electric: {
          400: '#4895EF',
          500: '#3A7BD5',
          600: '#2563EB',
          700: '#1D4ED8',
        },
      },
      fontFamily: {
        // Grand serifs for headlines
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        // Clean monospace for body
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
        // Geometric sans for accents
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display typography scale
        'display-2xl': ['8rem', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'display-xl': ['6rem', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-lg': ['4.5rem', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-md': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        // Body typography
        'body-lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0.01em' }],
        'body-md': ['1rem', { lineHeight: '1.8', letterSpacing: '0.015em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.7', letterSpacing: '0.02em' }],
        // Caption/label
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 1.2s ease-out forwards',
        'slide-in-right': 'slideInRight 1.2s ease-out forwards',
        'scale-in': 'scaleIn 1.4s ease-out forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '800': '800ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}
