const gulp = require('gulp');
const path = require('path');
const browsersync = require('browser-sync');
const connect = require('gulp-connect');



gulp.task('se', function() {
  browsersync.init({
        server: {
        baseDir: ""},
        tunnel: true,
        host: 'localhost',
        port: 4000,
        injectChanges: true,
        logPrefix: "SE"
    });

    gulp.watch("*.html").on('change', browsersync.reload);
    gulp.watch("js/*.js").on('change', browsersync.reload);
});
    gulp.task('default', ['se']);
