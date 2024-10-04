/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs', './src/**/*.css'],
  theme: {
    extend: {
        colors: {
            'card-bg': '#1a1a1a',
            'card-hover': '#252525',
            'avatar-border': '#3b82f6', // This is a blue color that should match the Norlin theme
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

