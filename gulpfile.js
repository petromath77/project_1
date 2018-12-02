var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    browsersync   = require('browser-sync'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require('gulp-notify'),
    svgSprite = require("gulp-svg-sprites");

gulp.task('browser-sync', function() {
    browsersync({
        port: 9000,
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('sprites', function () {
    return gulp.src('app/img/svg/*.svg')
        .pipe(svgSprite())
        .pipe(gulp.dest("app/img/assets"));
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	//.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	//.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('watch', ['sass', 'sprites', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch([
        'app/*.html',
        'app/js/**/*.js',
        'app/css/**/*.css',
    ]).on('change', browsersync.reload);
});

gulp.task('default', ['watch']);