module.exports = function(grunt) {
    grunt.registerTask('default',
        ['connect', 'jshint', 'compass', 'concat', 'watch']
        /* 'uglify', 'imagemin', 'sass' */
    );
};
