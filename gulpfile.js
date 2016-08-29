'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var html2js = require('gulp-ng-html2js');
var browserSync = require('browser-sync').create();
 
gulp.task('sass', function() {
	gulp.src([
			'scss/*.scss',
			'components/**/*.scss'
		])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('build/css/.'))
		.pipe(concatCss('styles.css'))
		.pipe(gulp.dest('.'));
});

gulp.task('components-concat', function() {
	return gulp.src('components/**/*.js')
		.pipe(concat('components.js'))
		.pipe(gulp.dest('.'));
});

gulp.task('components-template', function() {
	return gulp.src('components/**/*.html')
		.pipe(html2js({
			moduleName: 'app',
			prefix: 'components/'
		}))
		.pipe(gulp.dest('build/template/.'));
});

gulp.task('views-template', function() {
	return gulp.src('views/**/*.html')
		.pipe(html2js({
			moduleName: 'app',
			prefix: 'views/'
		}))
		.pipe(gulp.dest('build/template/.'));
});

gulp.task('template-concat', ['components-template', 'views-template'], function() {
	return gulp.src('build/template/**/*.js')
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('.'));
});

gulp.task('components', ['components-concat', 'template-concat'], function() {
	// do nothing
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