/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F72C5B',
        secondary: '#92C7CF',
        dark: '#213555',
        shade: '#3E5879',
        light: '#E5E1DA',
        text: '#0F1035',
        semiWhite: 'rgba(255,255,255,.3)',
      },
      gridTemplateColumns: {
        '20/80': 'minmax(0,20%) minmax(0,80%)',
        '60/40': 'minmax(0,60%) minmax(0,40%)',
        '70/30': 'minmax(0,70%) minmax(0,30%)',
        '30/70': 'minmax(0,30%) minmax(0,70%)',
        '200/1': 'minmax(0,200px) minmax(0,1fr)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities, theme }) {
      addUtilities({
        '.bg-overlay': {
          position: 'absolute',
          inset: '0',
          backgroundColor: 'var(--tw-bg-primary, black)',
          opacity: '0.35',
          zIndex: '-1',
        },
        '.button': {
          borderRadius: '1.5rem',
          padding: '0.5rem 1rem',
        },
        '.button-primary': {
          backgroundColor: theme('colors.primary'),
          color: 'var(--tw-text-white)',
          padding: '0.5rem 1rem',
          borderRadius: '3rem',
        },
        '.form-input': {
          padding: '1em 2em',
          backgroundColor: theme('colors.semiWhite'),
          color: theme('colors.secondary'),
          border: '0',
          borderRadius: '1rem',
          width: '100%',
        },
      })
    },
  ],
}
