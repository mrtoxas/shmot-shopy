const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const LiveReloadPlugin = require('webpack-livereload-plugin');

mix.setPublicPath('../../../../public/templates/original').js([
    'js/app.js',
    'js/swiper-bundle.min.js'
  ], './')
  .postCss('app.css', './', [
    tailwindcss('tailwind.config.js'),
    require('autoprefixer'),
  ]);
