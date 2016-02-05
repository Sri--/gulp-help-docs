// Gulp modules
var gulp   = require('gulp');
var help   = require('./index');
var jshint = require('gulp-jshint');
// NPM modules
var stylish    = require('jshint-stylish');
// Config
var helpConfig = {};

help.task('default', 'Default task runs unit tests and jshint', helpConfig);
gulp.task('default', ['jshint', 'tests']);

help.task('jshint', 'Runs jshint on gulp-help-docs source code', helpConfig);
gulp.task('jshint', function(){
	return gulp.src(['!node_modules/**/*.js', './**/*.js'])
			.pipe(jshint())
			.pipe(jshint.reporter(stylish));
});

help.task('tests', 'Runs unit tests on gulp-help-docs', helpConfig);
gulp.task('tests', function(){
	return gulp.src('./tests/**/*.js');
});

help.task('help', 'Displays gulp usage, available tasks and task descriptions', helpConfig);
gulp.task('help', help.docs.bind(this, gulp.tasks, helpConfig));