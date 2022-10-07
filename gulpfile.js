const gulp = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const clean = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const validator = require('gulp-html');
const rigger = require('gulp-rigger');
const merge = require('merge-stream');
// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});


gulp.task('styles', function () {
    return gulp.src('src/assets/scss/*.+(scss|sass)')
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: '',
            suffix: '.min'
        }))
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(clean({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src("./src/*.html")
        .pipe(rigger())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream())
});

gulp.task('html:validator', function () {
    return gulp.src('./dist/*.html')
        .pipe(validator())
});

gulp.task('js', function () {
    return gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js/'))
        .pipe(browserSync.stream());
});

gulp.task('assets', function () {
    const fonts = gulp.src('./src/assets/fonts/*.*')
        .pipe(gulp.dest('./dist/assets/fonts/'));
    const images = gulp.src('./src/assets/img/*.+(png|svg|jpg|jpeg|webp)')
        .pipe(gulp.dest('./dist/assets/img'));
    const css = gulp.src('./src/assets/css/*.css')
    .pipe(gulp.dest('./dist/assets/css'));
    const js = gulp.src('./src/assets/js/*.js')
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());

    return merge(fonts, images, css, js);
});

gulp.task('watch', function () {
    gulp.watch('src/assets/scss/**/*.+(scss|sass)').on('change', gulp.parallel('styles', browserSync.reload));
    gulp.watch('src/*.js').on('change', gulp.parallel('js', browserSync.reload));
    gulp.watch('src/*.html').on('change', gulp.parallel('html', browserSync.reload));
    gulp.watch('dist/*.html').on('change', gulp.parallel('html:validator'));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'styles', 'js', 'assets'))