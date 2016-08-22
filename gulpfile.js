'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync').create();
 
gulp.task('sass', function() {
	gulp.src([
			'scss/*.scss',
			'components/**/*.scss'
		])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('build/.'))
		.pipe(concatCss('styles.css'))
		.pipe(gulp.dest('.'));
});

gulp.task('components', function() {
	return gulp.src([
			'components/**/*.js'
		])
		.pipe(concat('components.js'))
		.pipe(gulp.dest('.'));
});

gulp.task('update', ['sass', 'components'], function() {
	// do nothing
});

gulp.task('serve', ['update'], function() {
    browserSync.init({
        server: './',
        online: true // speeds up startup
    });

    //gulp.watch('*.scss', ['sass']);
    //gulp.watch(['*.html', '*.css', '*.js']).on('change', browserSync.reload);
});