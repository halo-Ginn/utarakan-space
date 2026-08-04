/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2d3b2d',
          light: '#4a5d4a',
          muted: '#6b7f6b',
          pale:  '#c8d5c8',
        },
        copper: {
          DEFAULT: '#b87333',
          light:   '#d4943a',
          dark:    '#8a5520',
        },
        gold: {
          DEFAULT: '#d4af37',
          light:   '#e8cc6e',
          dark:    '#a88a20',
        },
        cream: {
          DEFAULT: '#fcfbf7',
          warm:    '#f5f0e8',
          muted:   '#ede8df',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #2d3b2d 0%, #4a5d4a 50%, #3d5040 100%)',
        'copper-gradient': 'linear-gradient(135deg, #b87333 0%, #d4af37 100%)',
        'cream-gradient':  'linear-gradient(180deg, #fcfbf7 0%, #f5f0e8 100%)',
      },
      boxShadow: {
        'copper-glow': '0 0 20px rgba(184, 115, 51, 0.3)',
        'forest-card': '0 4px 24px rgba(45, 59, 45, 0.12)',
        'warm':        '0 8px 32px rgba(184, 115, 51, 0.15)',
      },
      animation: {
        'fade-in':     'fadeIn 0.6s ease-out',
        'slide-up':    'slideUp 0.5s ease-out',
        'pulse-soft':  'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
      },
    },
  },
  plugins: [],
}
