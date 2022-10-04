const gulp = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const clean = require('gulp-clean-css');
const uglify = require('gulp-uglify');

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

gulp.task('styles', function () {
    return gulp.src('src/scss/*.+(scss|sass)')
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: '',
            suffix: '.min'
        }))
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(clean({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./src/assets/js/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.+(scss|sass)', gulp.parallel('styles'));
    gulp.watch('src/*.js').on('change', gulp.parallel('js', browserSync.reload));
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'styles', 'js'))