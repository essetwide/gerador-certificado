var gulp = require('gulp');
var req = require('gulp-include');
var fileInclude = require('gulp-file-include');
var sourcemaps = require('gulp-sourcemaps');
var liveServer = require('live-server');

gulp.task('components', () => {
    return gulp.src('src/editor/components/**/*.js')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file',
            filters: {
                min: function(str) {
                    return "'" + (str.replace(/\n/g, '').replace(/\'/g, '"')) + "'";
                }
            }
        }))
        .pipe(gulp.dest('src/editor/_components/'));
});

gulp.task('main', ['components'], () => {
    return gulp.src('src/main.js')
        .pipe(sourcemaps.init())
            .pipe(req())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('vendors', () => {
    return gulp.src('lib/vendors.js')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('default', ['main', 'vendors']);
gulp.task('serve', ['default'], () => {
    gulp.watch(['src/**/*.js', 'src/**/*.html', '!src/_*/*.*', '!dist/**/*.*'], ['default']);
    liveServer.start({ignore: 'src'});
});
gulp.task('watch', ['default'], () => {
    gulp.watch(['src/**/*.js', 'src/**/*.html', '!src/_*/*.*', '!dist/**/*.*'], ['default']);
});
