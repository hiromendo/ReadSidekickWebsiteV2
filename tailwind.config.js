/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Dark mode is driven by `<html data-theme="dark">`. Tailwind's `dark:`
  // variant works as expected; non-Tailwind CSS in src/index.css can
  // also use `[data-theme="dark"]` selectors directly.
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        /* ---------------------------------------------------------
         * Semantic tokens (preferred for all new + migrated code).
         * Resolved from CSS variables in src/design-system/tokens/.
         * --------------------------------------------------------- */
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          raised: 'rgb(var(--color-surface-raised) / <alpha-value>)',
          sunken: 'rgb(var(--color-surface-sunken) / <alpha-value>)',
          inverse: 'rgb(var(--color-surface-inverse) / <alpha-value>)',
        },
        fg: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          body: 'rgb(var(--color-text-body) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          inverse: 'rgb(var(--color-text-inverse) / <alpha-value>)',
          'on-brand': 'rgb(var(--color-text-on-brand) / <alpha-value>)',
        },
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
          hover: 'rgb(var(--color-brand-hover) / <alpha-value>)',
          subtle: 'rgb(var(--color-brand-subtle) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
          strong: 'rgb(var(--color-accent-strong) / <alpha-value>)',
        },
        'accent-hot': {
          DEFAULT: 'rgb(var(--color-accent-hot) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hot-hover) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          strong: 'rgb(var(--color-border-strong) / <alpha-value>)',
        },
        focus: 'rgb(var(--color-focus-ring) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',

        /* ---------------------------------------------------------
         * Legacy palette (kept while non-migrated components still
         * use them; removed in the PR that completes migration).
         * Do NOT reach for these in new code.
         * --------------------------------------------------------- */
        ivory: {
          50: '#FFFFFF',
          100: '#EFF2FF',
          200: '#E0E7FF',
          300: '#C6CEEB',
          400: '#A3B1DB',
        },
        ink: {
          700: '#4A5568',
          800: '#212D54',
          900: '#1A2444',
          950: '#0F1629',
        },
        coral: {
          50: '#EFF2FF',
          100: '#E0E7FF',
          200: '#C6CEEB',
          300: '#A3B1DB',
          400: '#748CD0',
          500: '#4259A8',
          600: '#354A8F',
          700: '#2A3D76',
          800: '#212D54',
          900: '#1A2444',
        },
        teal: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FFB347',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        ochre: {
          300: '#FFB8A5',
          400: '#FF8C69',
          500: '#F06745',
          600: '#DC4A25',
        },
        crimson: {
          400: '#748CD0',
          500: '#4259A8',
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
        // Semantic aliases (preferred)
        display: ['var(--font-display)'],
        ui: ['var(--font-ui)'],
        body: ['var(--font-body)'],
        // Legacy aliases — point at the same vars so theme swap reaches them
        serif: ['var(--font-display)'],
        mono: ['var(--font-body)'],
        sans: ['var(--font-ui)'],
      },
      fontSize: {
        'display-2xl': [
          'var(--text-display-2xl)',
          {
            lineHeight: 'var(--text-display-2xl--line-height)',
            letterSpacing: 'var(--text-display-2xl--letter-spacing)',
          },
        ],
        'display-xl': [
          'var(--text-display-xl)',
          {
            lineHeight: 'var(--text-display-xl--line-height)',
            letterSpacing: 'var(--text-display-xl--letter-spacing)',
          },
        ],
        'display-lg': [
          'var(--text-display-lg)',
          {
            lineHeight: 'var(--text-display-lg--line-height)',
            letterSpacing: 'var(--text-display-lg--letter-spacing)',
          },
        ],
        'display-md': [
          'var(--text-display-md)',
          {
            lineHeight: 'var(--text-display-md--line-height)',
            letterSpacing: 'var(--text-display-md--letter-spacing)',
          },
        ],
        'display-sm': [
          'var(--text-display-sm)',
          {
            lineHeight: 'var(--text-display-sm--line-height)',
            letterSpacing: 'var(--text-display-sm--letter-spacing)',
          },
        ],
        'body-lg': [
          'var(--text-body-lg)',
          {
            lineHeight: 'var(--text-body-lg--line-height)',
            letterSpacing: 'var(--text-body-lg--letter-spacing)',
          },
        ],
        'body-md': [
          'var(--text-body-md)',
          {
            lineHeight: 'var(--text-body-md--line-height)',
            letterSpacing: 'var(--text-body-md--letter-spacing)',
          },
        ],
        'body-sm': [
          'var(--text-body-sm)',
          {
            lineHeight: 'var(--text-body-sm--line-height)',
            letterSpacing: 'var(--text-body-sm--letter-spacing)',
          },
        ],
        caption: [
          'var(--text-caption)',
          {
            lineHeight: 'var(--text-caption--line-height)',
            letterSpacing: 'var(--text-caption--letter-spacing)',
          },
        ],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      // Spacing scale stays as JS literals — using CSS vars here would
      // force every consumer into arbitrary `[var(--…)]` syntax and break
      // IDE autocomplete for `p-4`, `gap-6`, etc.
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
        42: '10.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 1.2s ease-out forwards',
        'slide-in-right': 'slideInRight 1.2s ease-out forwards',
        'scale-in': 'scaleIn 1.4s ease-out forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
        float: 'float 4s ease-in-out infinite',
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
        editorial: 'var(--motion-ease-editorial)',
        smooth: 'var(--motion-ease-smooth)',
      },
      transitionDuration: {
        fast: 'var(--motion-duration-fast)',
        base: 'var(--motion-duration-base)',
        slow: 'var(--motion-duration-slow)',
        slower: 'var(--motion-duration-slower)',
        slowest: 'var(--motion-duration-slowest)',
        // Legacy literal aliases used by existing components
        800: 'var(--motion-duration-slow)',
        1200: 'var(--motion-duration-slower)',
        1500: '1500ms',
        2000: 'var(--motion-duration-slowest)',
      },
    },
  },
  plugins: [],
}
