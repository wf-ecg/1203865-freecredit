//github.com/gruntjs/grunt-contrib-uglify
module.exports = {
    options: {
        beautify: true,
        compress: false,
        mangle: false,
        // sourceMap: true,
    },
    my_target: {
        files: {
            'app/build/src.min.js': ['app/build/src.js']
        }
    },
};
