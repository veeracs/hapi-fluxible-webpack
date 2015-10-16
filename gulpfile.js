var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

gulp.task('webpack', function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('start-server', function (callback) {
	nodemon({
		script: 'index.js',
		exec: './node_modules/.bin/babel-node'
	});
	callback();
});

gulp.task('dev', ['webpack']);	//, 'server-start', 'watch']);
