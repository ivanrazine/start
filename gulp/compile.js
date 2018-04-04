/////////////////////////////////////////////////////
////// COMPILE
/////////////////////////////////////////////////////

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat-multi'),
    autoprefixer = require("gulp-autoprefixer"),
    rename = require('gulp-rename')

gulp.task('css', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./app/css/'));
        
});

gulp.task('js', function() {
    concat({
        'app.js': ['./src/js/vendor/**/*.js', './src/js/common.js', './src/js/**/*.js']
    })
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./app/js/'));
});

gulp.task('compile', ['css', 'js']);

gulp.task('c', ['compile']);


