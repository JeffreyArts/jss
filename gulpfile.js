var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

var sassLocation = './scss/*.scss';
var jssPrefix     = './scripts/jss/';
var locations = {
    core: [
        jssPrefix + 'jss.service.js',
        jssPrefix + 'jss.core.js',
        jssPrefix + 'core.actions.js',
        jssPrefix + 'core.classNames.js',
        jssPrefix + 'core.dataAttributes.js',
        jssPrefix + 'core.styles.js',
        jssPrefix + 'core.states.js',
        jssPrefix + 'core.varWatching.js',

        jssPrefix + 'jss.module.js',
        jssPrefix + 'jss.trigger.js',

        jssPrefix + 'jss.controller.js',
    ],
    modules: [
        jssPrefix + 'modules/*.js'
    ]
}

gulp.task('sass', function() {
    gulp.src(sassLocation)
        .pipe( sass({errLogToConsole: true}) )
        .pipe( gulp.dest('./css/') );
});

// Watch All
gulp.task('watchAll',function() {
    gulp.watch('./scss/*.scss',['sass']);
    gulp.watch('./scss/*/*.scss',['sass']);
    gulp.watch([locations.core, locations.modules], ['build:core','build:modules']);
});

gulp.task('build:core', function(){
    gulp.src(locations.core)
        .pipe(plumber())
        .pipe(concat('jss.js'))
        .pipe(gulp.dest('scripts/'))
});

gulp.task('build:modules', function(){
    gulp.src(locations.modules)
        .pipe(plumber())
        .pipe(concat('jss-modules.js'))
        .pipe(gulp.dest('scripts/'))
});



gulp.task('default', ['watchAll','build:core','build:modules']);