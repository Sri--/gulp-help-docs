'use strict';
// NPM modules
var gutil = require('gulp-util');
// Globals
var colors      = gutil.colors;
var log         = gutil.log;
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-help-docs';
// Default configuration
var defaults = {
	colors: {
		standard: colors.gray,
		usage: colors.gray,
		avail: colors.cyan,
		docs: colors.green
	},
	columnSpace: ' ',
	taskName   : 'TASKS',
	tool: '',
	usagePattern: '[TASK] [OPTIONS...]',
	gulp: {
		tool: 'GULP',
		usagePattern: 'gulp [TASK] [OPTIONS...]'
	}
};
// Display functions
// Prints usage pattern
function displayUsage(tool, usagePattern, colors){
	var tool         = tool || defaults.tool;
	var usagePattern = usagePattern || defaults.usagePattern;

	// Validations
	if(!colors.usage) throw new PluginError(PLUGIN_NAME, 'Missing usage property in color options!');

	log( colors.usage.underline(tool + ' USAGE') );
	log( colors.usage(usagePattern) );
}
// Prints available tasks
function displayAvailable(tasks, taskName, colors){
	var taskName = taskName || defaults.taskName;

	// Validations
	if(!colors.avail) throw new PluginError(PLUGIN_NAME, 'Missing avail property in color options!');

	log( colors.avail.underline(taskName + ' AVAILABLE') );
	log( colors.avail(tasks.join(', ')) );
}
// Prints defined documentation per task
function displayDocs(helpObj, taskName, avail, colors){
	var names    = Object.keys(helpObj);
	var cols     = names.reduce(function(c, d){ return d.length > c.length ? d : c; }).length + 2;
	var taskName = taskName || defaults.taskName;

	// Validations
	if(!colors.docs) throw new PluginError(PLUGIN_NAME, 'Missing docs property in color options!');

	log( colors.docs.underline(taskName + ' HELP') );
	logArray(names.map(function(task, index){
		return (!avail || avail.indexOf(task) > -1) ? columnizer(task, cols) + helpObj[task] : '';
	}), colors.docs);
}
// Utility functions
function columnizer(str, cols){
	for(var diff = cols - str.length; diff > 0; diff--){
		str += defaults.columnSpace;
	}

	return str;
}
function logArray(messages, format){
	var format = format || defaults.colors.standard;

	messages.map(function(msg, index){
		if(msg.length > 0) log( format(msg) );
	});
}

// Parses configuration object and displays CLI output
module.exports = function(taskObject, opts){
	var opts = opts || {};
	// Options validation
	if(!taskObject && !opts.availableTasks) throw new PluginError(PLUGIN_NAME, 'Missing gulp tasks list object!');
	if(!opts.tasks) throw new PluginError(PLUGIN_NAME, 'No gulp task documentation defined! Provide docs for one task or more');
	if(opts.colors){
		Object.keys(opts.colors).map(function(category, index){
			var color = opts.colors[category];
			if(defaults.colors[category] && colors.hasOwnProperty(color)) defaults.colors[category] = color;
		});
	}

	// Display GULP help
	displayUsage(opts.tool || defaults.gulp.tool, opts.usagePattern || defaults.gulp.usagePattern, opts.colors || defaults.colors);
	displayAvailable(Object.keys(taskObject), opts.taskName, opts.colors || defaults.colors);
	displayDocs(opts.tasks, null, null, opts.colors || defaults.colors);

	// Display OTHER help
	if(opts.other){
		opts.other.map(function(other, index){
			displayUsage(other.tool, other.usage, opts.colors || defaults.colors);
			if(other.avail) displayAvailable(other.avail, other.taskName, opts.colors || defaults.colors);
			if(other.tasks) displayDocs(other.tasks, other.taskName, other.avail, opts.colors || defaults.colors);
		});
	}
};