module.exports = function(grunt) {
    grunt.registerTask('default',
        ['connect', 'jshint', 'concat', 'sass', 'watch']
        /* 'imagemin', 'sass', 'uglify' */
    );
};
