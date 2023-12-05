const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const LiveReloadPlugin = require('webpack-livereload-plugin');

mix.setPublicPath('../../../../public/templates/default').js([
    'js/app.js',
  ], './')
  .postCss('app.css', './', [
    tailwindcss('tailwind.config.js'),
    require('autoprefixer'),
  ]);
