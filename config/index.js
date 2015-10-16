'use strict';

var path = require('path');

var baseDir = path.resolve(__dirname, '..');
var buildDir = path.join(baseDir, '/build');

//	base config
var config = {
	paths: {
		app: path.join(baseDir, '/lib/app'),
		client: path.join(baseDir, '/lib/client'),
		server: path.join(baseDir, '/lib/server'),
		base: baseDir,
		build: buildDir
	},
	assets: {
		js: {
			paths: {
				output: path.join(buildDir, '/js')
			}
		},
		css: {
			paths: {
				output: path.join(buildDir, '/css')
			}
		},
		images: {
			paths: {
				output: path.join(buildDir, '/images')
			}
		}
	}
};

module.exports = config;
