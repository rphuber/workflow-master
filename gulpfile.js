// dependency requirements
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

// variables for sources
var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = ['components/scripts/*.js'];  //Can list script files individually in the order in which you want them processed
var sassSources = ['components/sass/main.scss'];
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json'];


// tasks
gulp.task('html', function() {
	gulp.src(htmlSources)
	  .pipe(connect.reload())
});

gulp.task('json', function() {  // remove this task if you are not using json files
	gulp.src(jsonSources)
	  .pipe(connect.reload())
});

gulp.task('coffee', function() {
	gulp.src(coffeeSources)
	  .pipe(coffee({ bare: true })
	  .on('error', gutil.log))
	  .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
	gulp.src(jsSources)
	  .pipe(concat('script.js'))
	  .pipe(browserify())
	  .pipe(gulp.dest('builds/development/js'))
	  .pipe(connect.reload())
});

gulp.task('compass', function() {
	gulp.src(sassSources)
	  .pipe(compass({
	  	sass:  'components/sass',
	  	image: 'builds/development/images',
	  	style: 'expanded'
	  })
	  .on('error', gutil.log))
	  .pipe(gulp.dest('builds/development/css'))
	  .pipe(connect.reload())
});

gulp.task('connect', function() {
	connect.server({
		root: 'builds/development/',
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
});

gulp.task('default', ['html', 'coffee', 'js', 'compass', 'connect', 'watch']);