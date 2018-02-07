var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var replace = require('gulp-replace');
var tap = require('gulp-tap');
var del = require('del');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var sha = crypto.createHash('sha256');

gulp.task('browserify', function() {
    del.sync('./dist');

    var b = browserify({
        entries: './src/scripts/entry.js',
        debug: false,
    });
    var bundleHash;

    var bundle = b.bundle();

    bundle
        .pipe(source())
        .pipe(buffer())
        .pipe(
            tap(function(file) {
                var fileContent = file.contents.toString('utf-8');
                sha.update(fileContent);
                bundleHash = sha.digest('hex');

                gulp
                    .src('./src/node/index.ejs')
                    .pipe(replace('[bundlehash]', bundleHash))
                    .pipe(gulp.dest('./dist/'))
                    .pipe(
                        tap(function() {
                            fs.writeFileSync(
                                path.resolve(__dirname, '../dist/', `bundle.${bundleHash}.js`),
                                fileContent
                            );
                        })
                    );
            })
        );
});
