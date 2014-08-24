//github.com/gruntjs/grunt-contrib-concat
module.exports = {
    dist: {
        src: [
        'scripts/[a-z]*.js',
        ],
        dest: 'app/build/src.js',
    },
};
