//github.com/gruntjs/grunt-contrib-sass
module.exports = {
    dist: {
        options: {
            compass: true,
            require: 'animation',
            sourcemap: 'auto',
            style: 'expanded', // cssmin will minify later
        },
        files: {
            'app/build/print.css': 'scss/print.scss',
            'app/build/screen.css': 'scss/screen.scss',
        }
    }
};
