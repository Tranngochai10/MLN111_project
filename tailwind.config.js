/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B91C1C',
        'primary-dark': '#991B1B',
        'primary-light': '#DC2626',
        gold: '#D4AF37',
        'gold-light': '#F0D060',
        cream: '#F8F7F4',
        surface: '#FFFFFF',
        text: '#111827',
        'text-heading': '#0F172A',
        muted: '#6B7280',
        border: '#E5E1D8',
        'border-light': '#F0EDE8',
        success: '#15803D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        heading: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        quote: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 7vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-xl': ['clamp(2.5rem, 5vw, 4.25rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-md': ['clamp(1.625rem, 2.75vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        'body-lg': ['1.1875rem', { lineHeight: '1.85', fontWeight: '400' }],
        'body-md': ['1.0625rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.65', fontWeight: '400' }],
        'label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '600' }],
        'quote': ['clamp(1.875rem, 3.75vw, 3.25rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        'card': '0 1px 4px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 40px rgba(185,28,28,0.08), 0 4px 12px rgba(0,0,0,0.04)',
        'card-active': '0 12px 40px rgba(185,28,28,0.12), 0 4px 12px rgba(185,28,28,0.08)',
        'gold': '0 4px 20px rgba(212,175,55,0.25)',
        'button': '0 3px 12px rgba(185,28,28,0.2)',
      },
      animation: {
        'float': 'float-up 4s ease-in-out infinite',
      },
      keyframes: {
        'float-up': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '42': '10.5rem',
      },
    },
  },
  plugins: [],
}
