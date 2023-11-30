/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./**/*.blade.php'],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'primary-lighter': 'var(--primary-lighter)',
        'primary-darker': 'var(--primary-darker)',
        'secondary': 'var(--secondary)',     
        'backplate': 'var(--backplate)', 
      },
      height: {
        'carousel': 'var(--carousel-height)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}