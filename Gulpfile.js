var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat-multi'),
    rename = require('gulp-rename');

gulp.task('styles', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./css/'))
        
});

gulp.task('concat', function() {
    concat({
        'app.js': ['src/js/vendor/**/*.js', 'src/js/common.js', 'src/js/**/*.js']
    })
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./js/'));
});

gulp.task('default', function () {
    gulp.watch('src/sass/**/*.scss',['styles']);
    gulp.watch('src/js/**/*.js',['concat']);
});


