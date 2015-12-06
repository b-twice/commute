const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const data = require('gulp-data');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const PATHS = {
    templates: "client/templates/*.jade",
    styles: "client/styles/*.scss",
    images: "./public/*",
    js: "client/js/*.js",
    d3_json: "./client/json/d3/*.json"
};

gulp.task('sass', () => {
    gulp.src(PATHS.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("build"));
});
gulp.task('templates', () => {
    return gulp.src(PATHS.templates)
        .pipe(jade())
        .pipe(gulp.dest("build"));
});
gulp.task('images', () => {
    return gulp.src(PATHS.images)
        .pipe(gulp.dest("build/public"))
});
gulp.task('compress', () => {
    return gulp.src(PATHS.js)
        .pipe(concat('build.js'))
        .pipe(babel({
            presets: ['babel-preset-es2015']
        }))
        //.pipe(uglify())
        .pipe(gulp.dest('build'));
});
gulp.task('d3_json', () => {
    return gulp.src(PATHS.d3_json)
        .pipe(gulp.dest("build/public"))
});
gulp.task('watch', () => {
    gulp.watch(PATHS.styles, ['sass']);
    gulp.watch(PATHS.templates, ['templates']);
    gulp.watch(PATHS.js, ['compress'])
});

gulp.task('default', ['d3_json', 'watch', 'templates', 'sass', 'images', 'compress']);