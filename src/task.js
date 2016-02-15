'use strict';
// NPM modules
var gutil = require('gulp-util');
// Globals
var PLUGIN_NAME = 'gulp-help-docs';
var PluginError = gutil.PluginError;

// Adds task's help documentation to help configuration object
module.exports = function(taskName, taskDoc, config){
	// Validations
	if(!taskName) throw new PluginError(PLUGIN_NAME, 'Gulp task name not provided!')
	if(!taskDoc)  throw new PluginError(PLUGIN_NAME, 'Gulp task documentation not provided!');
	if(!config)   throw new PluginError(PLUGIN_NAME, 'Help config object not provided!');

	config.tasks = config.tasks || {};
	if( config.tasks.hasOwnProperty(taskName) ) throw new PluginError(PLUGIN_NAME, 'Gulp task or documentation already defined!');
	config.tasks[taskName] = taskDoc;

	return config;
};