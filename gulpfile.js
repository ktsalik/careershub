const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('build-controllers', function() {
  return gulp.src('./app/public/controllers/*.js')
    .pipe(concat('controllers.js'))
    .pipe(gulp.dest('./app/public/assets/js'))
    .pipe(uglify())
    .pipe(rename('controllers.min.js'))
    .pipe(gulp.dest('./app/public/assets/js'));
});

gulp.task('default', ['build-controllers']);
