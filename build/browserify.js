var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('browserify', function () {
    return gulp.src('./src/scripts/entry.js')
        .pipe(browserify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./dist/'));
});