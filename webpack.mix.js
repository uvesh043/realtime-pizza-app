// webpack.mix.js

let mix = require('laravel-mix');

mix.js('resources/app.js', 'public/js/app.js').sass('resources/sass/app/scss','public/css/app.css');