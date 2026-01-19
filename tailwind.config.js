/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds - blue-tinted (brand aligned)
        ivory: {
          50: '#FFFFFF',      // Pure white for cards
          100: '#EFF2FF',     // Main background
          200: '#E0E7FF',     // Slightly darker sections
          300: '#C6CEEB',     // Borders
          400: '#A3B1DB',     // Muted accents
        },
        // Text colors - indigo-based
        ink: {
          700: '#4A5568',     // Body text
          800: '#212D54',     // Headings
          900: '#1A2444',     // Dark sections
          950: '#0F1629',     // Darkest (footer)
        },
        // Primary brand - Blue/Indigo
        coral: {
          50: '#EFF2FF',
          100: '#E0E7FF',
          200: '#C6CEEB',
          300: '#A3B1DB',
          400: '#748CD0',     // Primary light
          500: '#4259A8',     // Main CTA color
          600: '#354A8F',     // Hover state
          700: '#2A3D76',
          800: '#212D54',
          900: '#1A2444',
        },
        // Secondary accent - Marigold
        teal: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FFB347',     // Main accent
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Tertiary accent - Coral/Hot
        ochre: {
          300: '#FFB8A5',
          400: '#FF8C69',     // Hot accent
          500: '#F06745',
          600: '#DC4A25',
        },
        // Legacy - updated to blue theme
        crimson: {
          400: '#748CD0',
          500: '#4259A8',     // Match primary
          600: '#354A8F',
          700: '#2A3D76',
        },
        electric: {
          400: '#748CD0',
          500: '#4259A8',
          600: '#354A8F',
          700: '#2A3D76',
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
        'float': 'float 4s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
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
