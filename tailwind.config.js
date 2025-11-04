/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Typography System - Two font families
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'system-ui', 'sans-serif'],
      },
      
      // Typography Scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
      },

      // Color System - Neutral, soft backgrounds with high contrast text
      colors: {
        // Primary brand colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        
        // Neutrals for text and backgrounds
        neutral: {
          50: '#f9f9f6', // Soft background
          100: '#f5f5f2',
          200: '#e5e5e0',
          300: '#d6d6d0',
          400: '#a3a3a0',
          500: '#737370',
          600: '#525250',
          700: '#404040',
          800: '#262626',
          900: '#111111', // High contrast text
        },

        // Keep existing system colors for compatibility
        background: '#f9f9f6',
        foreground: '#111111',
        border: '#e5e5e0',
        ring: '#0ea5e9',
        
        muted: {
          DEFAULT: '#f5f5f2',
          foreground: '#737370',
        },
        
        accent: {
          DEFAULT: '#0ea5e9',
          foreground: '#ffffff',
        },
        
        card: {
          DEFAULT: '#ffffff',
          foreground: '#111111',
        },
      },

      // Container System
      maxWidth: {
        '7xl': '80rem',
        'prose': '65ch',
      },

      // Spacing System - Unified tokens
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },

      // Border Radius System
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      // Shadow System - Tiered shadows
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },

      // Animation System
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // Grid System
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },

      // Aspect Ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '5/4': '5 / 4',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}