/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geologica', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        12: [
          '12px',
          {
            lineHeight: '18px',
          },
        ],
        14: [
          '14px',
          {
            lineHeight: '18px',
          },
        ],
        16: [
          '16px',
          {
            lineHeight: '22px',
          },
        ],
        20: [
          '20px',
          {
            lineHeight: '28px',
          },
        ],
        24: [
          '24px',
          {
            lineHeight: '32px',
          },
        ],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        bold: '700',
      },
      colors: {
        brand: {
          blue: '#00BFFF',
          green: '#16A34A',
          orange: '#D97706',
          red: '#DC2626',
          purple: '#BB73FF',
        },
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
        text: {
          body: '#1e293b',
          description: '#64748b',
          brand: '#00BFFF',
        },
        border: {
          primary: '#e2e8f0',
          divider: '#f1f5f9',
        },
        bg: {
          container: '#f8fafc',
          primary: '#f1f5f9',
          brand: '#E6F3F9',
          success: '#E8F6ED',
          warning: '#FCF4E8',
          error: '#FCEBEB',
          blue: '#E6F3F9',
          green: '#E8F6ED',
          orange: '#FCF4E8',
          red: '#FCEBEB',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(to right, #BB73FF, #FF333F)',
        'gradient-2': 'linear-gradient(to right, #FFAA21, #FF333F)',
        'gradient-3': 'linear-gradient(to right, #00BFFF, #BB73FF)',
        'gradient-4': 'linear-gradient(to right, #00BFFF, #00B8A9)',
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
