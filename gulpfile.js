/**
 * Created by fg on 15/5/6.
 */
/* 載入外掛 */
var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  compass = require('gulp-compass'),
  minifyCss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  fs = require('fs'),
  concat = require('gulp-concat'),
  header = require('gulp-header'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache');

/* compile compass */
gulp.task('compile-compass', function() {
  gulp.src('scss/*.scss')
    .pipe(compass({
      css: 'dist/assets/css',
      sass: 'scss',
      comments: false
    }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({message: 'Compass task complete'}));
});

/* compile js */
gulp.task('compile-js', function () {
  gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({message: 'Javascript task complete'}))
});

/* clean task */
gulp.task('clean', function () {
  return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img', 'dist/assets/html'], {read: false})
    .pipe(clean());
});

/* watch file */
gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['compile-compass']);
  gulp.watch('js/*.js', ['compile-js']);
});

/* default */
gulp.task('default', ['compile-compass','compile-js']);