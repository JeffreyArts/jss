var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var sassLocation = './scss/*.scss';
var jssPrefix     = './scripts/jss/';
var jsLocation   = [
    jssPrefix + 'core.index.js',
    jssPrefix + 'core.classNames.js',
    jssPrefix + 'core.states.js',
    jssPrefix + 'core.triggers.js',
    jssPrefix + 'core.modules.js',
    jssPrefix + 'module.test.js',
    jssPrefix + 'module.expand.js',
];
gulp.task('styles', function() {
    gulp.src(sassLocation)
        .pipe( sass({errLogToConsole: true}) )
        .pipe( gulp.dest('./css/') );
});

// Watch Sass
gulp.task('sass',function() {
    gulp.watch('./scss/*.scss',['styles']);
    gulp.watch('./scss/*/*.scss',['styles']);
    gulp.watch(jsLocation,['build:js']);
});

gulp.task('build:js', function(){
    gulp.src(jsLocation)
        ///.pipe(plumber())
        .pipe(concat('jss.js'))
        //.pipe(ngAnnotate())
        .pipe(gulp.dest('scripts/'))
        //.pipe(rename({suffix: '.min'}))
});



gulp.task('default', ['sass',"build:js"]);