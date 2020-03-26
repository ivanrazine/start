"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefixer = require("gulp-autoprefixer"),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

/////////////////////////////////////////////////////
////// COMPILE
/////////////////////////////////////////////////////

gulp.task('css', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', function(err) {
            notify().write(err);
            this.emit('end');
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream())
        .pipe(notify("CSS compiled"));
});

gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./app/js/'))
        .pipe(browserSync.stream())
        .pipe(notify("JS compiled"));
});

gulp.task('compile', gulp.series('css', 'js'));
gulp.task('c', gulp.series('css', 'js'));

/////////////////////////////////////////////////////
////// WATCH
/////////////////////////////////////////////////////

gulp.task('BrowserSync', function (done) {
    browserSync.reload();
    done();
});

gulp.task('w', function () {

    browserSync.init({
        server: "./app"
    });

    gulp.watch('./src/**/*.*', gulp.series('css', 'js')); 

});
