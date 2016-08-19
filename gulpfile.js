const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const watch = require('gulp-watch');

gulp.task('build-controllers', function() {
  return gulp.src('./app/public/controllers/*.js')
    .pipe(concat('controllers.js'))
    .pipe(gulp.dest('./app/public/assets/js'))
    .pipe(uglify())
    .pipe(rename('controllers.min.js'))
    .pipe(gulp.dest('./app/public/assets/js'));
});

gulp.task('watch-controllers', function() {
  return gulp.watch('./app/public/controllers/*.js', ['build-controllers']);
});

gulp.task('build-directives', function() {
  return gulp.src('./app/public/directives/*.js')
    .pipe(concat('directives.js'))
    .pipe(gulp.dest('./app/public/assets/js'))
    .pipe(uglify())
    .pipe(rename('directives.min.js'))
    .pipe(gulp.dest('./app/public/assets/js'));
});

gulp.task('watch-directives', function() {
  return gulp.watch('./app/public/directives/*.js', ['build-directives']);
});

gulp.task('build-components', function() {
  return gulp.src('./app/public/components/*.js')
    .pipe(concat('components.js'))
    .pipe(gulp.dest('./app/public/assets/js'))
    .pipe(uglify())
    .pipe(rename('components.min.js'))
    .pipe(gulp.dest('./app/public/assets/js'));
});

gulp.task('watch-components', function() {
  return gulp.watch('./app/public/components/*.js', ['build-components']);
});

gulp.task('default', ['build-controllers', 'build-directives', 'build-components', 'watch-controllers', 'watch-directives', 'watch-components']);
