//github.com/gruntjs/grunt-contrib-jshint
module.exports = {
    options: {
        '-W015': true,
//        '-W013': true,
//        '-W033': true,
        '-W061': true,
    },
    beforeconcat: ['app/*.js', 'scripts/*.js'],
};
