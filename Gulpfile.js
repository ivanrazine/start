var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat-multi'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

/////////////////////////////////////////////////////
////// PROD
/////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////
////// DEV
/////////////////////////////////////////////////////

gulp.task('jsDev', function() {
    concat({
        'app.js': ['./src/js/vendor/**/*.js', './src/js/common.js', './src/js/**/*.js']
    })
    .pipe(gulp.dest('./app/js/'));
});

gulp.task('jsBrowserSync', ['jsDev'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('cssDev', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream());
        
});

gulp.task('dev', function () {

    browserSync.init({
        notify: false,
        server: "./app"
    });

    gulp.watch('./src/sass/**/*.scss',['cssDev']);
    gulp.watch('./src/js/**/*.js',['jsBrowserSync']);

});
