const gulp = require('gulp');
const path = require('path');
const browsersync = require('browser-sync');
const connect = require('gulp-connect');



/*gulp.task('less', function () {
return gulp.src('src/less/main.less')
.pipe(plumber())
.pipe(less())
.pipe(autoprefixer({
browsers: ['> 1%']
}))

.pipe(plumber.stop())
.pipe(gulp.dest('./build/css'))
.pipe(connect.reload());
});

gulp.task('pug', function () {
  return gulp.src('src/pug/pages/*.pug')
  .pipe(plumber())
  .pipe(pug({
    pretty: '\t'
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest('./build'))
  .pipe(connect.reload());
});*/


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
    //gulp.watch("src/less/main.less", ['less']);
    //gulp.watch("src/pug/**/*.pug", ['pug']);
    gulp.watch("*.html").on('change', browsersync.reload);
    //gulp.watch("build/css/main.css").on('change', browsersync.reload);
    gulp.watch("js/*.js").on('change', browsersync.reload);
});
    gulp.task('default', ['se']);

    /*gulp.task('min', function() {
    return gulp.src('build/css/main.css')
    .pipe(minify({compatibility: 'ie8'}))
    .pipe(rename({
    dirname: "",
    basename: "main",
    prefix: "",
    suffix: "-min",
    extname: ".css"
  }))
    .pipe(gulp.dest('build/css/'));
}); */