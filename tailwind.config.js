/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs', './src/**/*.css'],
  safelist: [
    'fa', 'fa-star', 'fa-star-o', 'text-yellow-400', 'text-gray-400', 
    'star-button', 'star-icon'
  ],
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

