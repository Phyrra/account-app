'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var html2js = require('gulp-ng-html2js');
var browserSync = require('browser-sync').create();
var jscs = require('gulp-jscs');
var zip = require('gulp-zip');
 
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

gulp.task('template-concat', ['components-template'], function() {
	return gulp.src('build/template/**/*.js')
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('.'));
});

gulp.task('components', ['components-concat', 'template-concat'], function() {
	// do nothing
});

gulp.task('build', ['sass', 'components'], function() {
	// do nothing
});

gulp.task('serve', ['build'], function() {
	browserSync.init({
		server: './',
		online: true // speeds up startup
	});
});

gulp.task('jscs', function() {
	return gulp.src([
			'components/**/*.js',
			'filters/**/*.js',
			'services/**/*.js'
		])
		.pipe(jscs())
		.pipe(jscs.reporter());
});

gulp.task('build-android', ['build'], function() {
    gulp.src([
            'index.html',
            'components.js',
            'templates.js',
            'styles.css',
            'filters/**',
            'services/**',
            'bower_components/**'
        ], { base: '.' })
        .pipe(zip('android-assets.zip'))
        .pipe(gulp.dest('./build'))
});