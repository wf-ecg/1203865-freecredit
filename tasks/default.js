module.exports = function(grunt) {
    grunt.registerTask('default',
        ['connect', 'concat', 'jshint', 'sass', 'uglify', 'watch']
        /* 'uglify', 'imagemin', 'sass' */
    );
};
