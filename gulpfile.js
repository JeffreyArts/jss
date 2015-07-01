var gulp = require('gulp');
var sass = require('gulp-sass');

var sassLocation = './scss/*.scss';
gulp.task('styles', function() {
    gulp.src(sassLocation)
        .pipe( sass({errLogToConsole: true}) )
        .pipe( gulp.dest('./css/') );
});

// Watch Sass
gulp.task('sass',function() {
    gulp.watch('./scss/*.scss',['styles']);
    gulp.watch('./scss/*/*.scss',['styles']);
});


gulp.task('default', ['sass']);