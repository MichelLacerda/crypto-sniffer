let mix = require('laravel-mix');

mix.setPublicPath('./')
    .sass('assets/sass/popup.sass', 'dist/css')
    .js('assets/js/background.js', 'dist/js')
    .js('assets/js/popup.js', 'dist/js').vue()
    .copy('assets/images', 'dist/images')
    .copy('assets/css/fonts', 'dist/css/fonts')
    .copy('assets/js/materialize.min.js', 'dist/js')
    .copy('assets/js/simplebar.min.js', 'dist/js')
    .copy('assets/css/cryptofont.css', 'dist/css')
    .copy('assets/css/materialize.min.css', 'dist/css')
    .css('assets/css/simplebar.css', 'dist/css')
    .options({
        processCssUrls: false
    });