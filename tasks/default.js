module.exports = function(grunt) {
    grunt.registerTask('default',
        ['connect', 'jshint', 'compass', 'concat', 'uglify', 'watch']
        /* 'uglify', 'imagemin', 'sass' */
    );
};
