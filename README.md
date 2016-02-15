# gulp-help-docs
gulp-help-docs is a plugin to document and display descriptions of gulp tasks, their usage within a gulpfile and all available tasks. It also provides the ability to add additional documentation for other tools or processes.

### Gulp usage

**gulpfile.js**

```JavaScript
var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// Config variable can be empty or come with predefined docs (within package.json or gulpfile)
var helpConfig = require('./package.json')['helpDocs'] || {};

help.task('default', 'Default task runs unit tests and jshint', helpConfig);
gulp.task('default', ['js', 'css']);

help.task('css', 'Builds and minifies CSS files', helpConfig);
gulp.task('css', function(){
	return gulp.src('./**/*.css')
		.pipe(concat('index.css'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});

help.task('js', 'Builds and minifies JS files', helpConfig);
gulp.task('js', function(){
	return gulp.src('./**/*.js')
		.pipe(concat('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});

help.task('help', 'Displays gulp usage, available tasks and task descriptions', helpConfig);
gulp.task('help', help.docs.bind(this, gulp.tasks, helpConfig));
```

### Help configuration
The help configuration object can exist within your gulpfile or package.json. It can be an empty object or one that contains predefined documentation for other tools or purposes. The JSON below is an example.

```JavaScript
// Configuration in package.json
"helpDocs": {
	"other": [
		{
			"tool": "BUILDER",
			"avail": ["deploy", "destroy"],
			"taskName": "PHASES",
			"tasks": {
				"deploy": "Deploys application and assets",
				"destroy": "Erases application completely"
			},
			"usage": "run [PHASE] [OPTIONS...]"
		}
	]
}
```

### help.task(taskName, taskDoc, helpConfig)

Call this method to add a task's documentation to the help config

```
taskname   | [String] | Name of the task (same as gulp.task)
taskinfo   | [String] | Documentation or description of task
helpConfig | [Object] | Empty object or predefined with docs
```

### help.docs(gulp.tasks, helpConfig)

Call this method to display the documentation via a gulp task

```
gulp.tasks | [Object] | Tasks property of the gulp instance
helpConfig | [Object] | Config object used with help.task
```