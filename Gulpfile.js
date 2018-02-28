var gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel');

gulp.task('styles', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.task('babel', function() {
    gulp.src('src/js/scripts.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./js/'))
});

gulp.task('default', function () {
    gulp.watch('src/sass/**/*.scss',['styles']);
    gulp.watch('src/js/scripts.js',['babel']);
});


