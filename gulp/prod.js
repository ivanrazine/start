/////////////////////////////////////////////////////
////// PROD
/////////////////////////////////////////////////////

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat-multi'),
    rename = require('gulp-rename')

gulp.task('css', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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

gulp.task('prod', function () {
    gulp.watch('./src/sass/**/*.scss',['css']);
    gulp.watch('./src/js/**/*.js',['js']);
});


