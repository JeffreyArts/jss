var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var documentation = require('gulp-documentation');

// Destination parameters
var pipe = {
    sass: sass({
        errLogToConsole: true
    })
}


// Destination parameters
var destination = {
    core: './lib',
    css: './css/',
    modules: './scripts',
    documentation: './docs'
}


// Location parameters
var location = {
    sass: [
        './scss/*.scss'
    ],
    core: [
        './scripts/jss/jss.service.js',
        './scripts/jss/jss.core.js',
        './scripts/jss/core.actions.js',
        './scripts/jss/core.classNames.js',
        './scripts/jss/core.dataAttributes.js',
        './scripts/jss/core.styles.js',
        './scripts/jss/core.states.js',
        './scripts/jss/core.varWatching.js',

        './scripts/jss/jss.module.js',
        './scripts/jss/jss.trigger.js',

        './scripts/jss/jss.controller.js',
    ],
    modules: [
        './scripts/jss/modules/*.js'
    ]
}



// Sass parsing
gulp.task('sass', function() {
    return gulp.src(location.sass)
        .pipe( sass({
            errLogToConsole: true
        }) )
        .pipe( gulp.dest(destination.css) );
});


// Concat jss core
gulp.task('build:core', function(){
    return gulp.src(location.core)
        .pipe(plumber())
        .pipe(concat('jss.js'))
        .pipe(gulp.dest(destination.core))
});

// Concat jss modules
gulp.task('build:modules', function(){
    return gulp.src(location.modules)
        .pipe(plumber())
        .pipe(concat('jss-modules.js'))
        .pipe(gulp.dest(destination.modules))
});

// Document library
gulp.task('document:core', function(){
    gulp.src(destination.core + "/jss.js")                                // Source is the parsed JSS Core
      .pipe(documentation({ format: 'html' }))                                  // Document function
      .pipe(gulp.dest(destination.documentation));                              // This is where it is saved/generated to
});


//////////////////////////////////////////////////
//
// Gulp Watchers
//
//////////////////////////////////////////////////

// Watch All
gulp.task('watchAll',function() {
    gulp.watch('./scss/*.scss',['sass']);
    gulp.watch('./scss/*/*.scss',['sass']);
    gulp.watch([location.core, location.modules], ['build:core','build:modules']);
    gulp.watch([location.core], ['document:core']);
});



//////////////////////////////////////////////////
//
// Gulp Commands
//
// This are the commans you call with `gulp default` || `gulp otherCommand`
//////////////////////////////////////////////////
gulp.task('default', ['watchAll']);