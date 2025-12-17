/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Font family
      fontFamily: {
        sans: ['Geologica', 'system-ui', '-apple-system', 'sans-serif'],
      },

      // Font sizes with line heights
      fontSize: {
        12: ['12px', { lineHeight: '18px' }],
        14: ['14px', { lineHeight: '18px' }],
        16: ['16px', { lineHeight: '22px' }],
        20: ['20px', { lineHeight: '28px' }],
        24: ['24px', { lineHeight: '32px' }],
      },

      // Font weights
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        bold: '700',
      },

      // Brand colors
      colors: {
        // Brand accent colors
        brand: {
          blue: '#00BFFF',
          green: '#16A34A',
          orange: '#D97706',
          red: '#DC2626',
          purple: '#BB73FF',
        },

        // Background colors
        bg: {
          blue: '#E6F3F9',
          green: '#E8F6ED',
          orange: '#FCF4E8',
          red: '#FCEBEB',
        },

        // Black scale
        black: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
        },

        // Semantic colors - Text
        text: {
          body: '#1e293b', // Black-800
          description: '#64748b', // Black-500
          brand: '#00BFFF', // Blue
        },

        // Semantic colors - Border
        border: {
          primary: '#e2e8f0', // Black-200
          divider: '#f1f5f9', // Black-100
        },

        // Semantic colors - Background
        background: {
          container: '#f8fafc', // Black-50
          primary: '#f1f5f9', // Black-100
          brand: '#E6F3F9', // bg_Blue
          success: '#E8F6ED', // bg_Green
          warning: '#FCF4E8', // bg_Orange
          error: '#FCEBEB', // bg_Red
        },
      },

      // Gradient colors
      backgroundImage: {
        'gradient-linear-1': 'linear-gradient(to right, #BB73FF, #FF333F)',
        'gradient-linear-2': 'linear-gradient(to right, #FFAA21, #FF333F)',
        'gradient-linear-3': 'linear-gradient(to right, #00BFFF, #BB73FF)',
        'gradient-linear-4': 'linear-gradient(to right, #00BFFF, #00B8A9)',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
