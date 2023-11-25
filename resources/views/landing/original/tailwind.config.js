/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./**/*.blade.php'],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'primary-lighter': 'var(--color-primary-lighter)',
        'primary-darker': 'var(--color-primary-darker)',
        'secondary': 'var(--color-secondary)',     
        'backplate': 'var(--color-backplate)', 
      },
      height: {
        'carousel': 'var(--size-carousel-height)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}