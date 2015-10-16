'use strict';

var config = require('../../../config');
var Hapi = require('hapi');
var Routes = require(config.paths.server + '/routes');

//	labels: http, api - helps decide what plugins will be loaded for each connection
//	some plugins listen to one connection and not other, some listen to both
var internals = {
	servers: {
		http: {
			port: 7777,
			host: '0.0.0.0',
			labels: ['http']
		},
		api: {
			port: 7778,
			host: '0.0.0.0',
			labels: ['api']
		}
	},
	options: {
		files: {
			relativeTo: config.paths.base
		}
	}
};

exports.init = function(cb) {
	var server = new Hapi.Server();
	server.connection(internals.servers.http);
	//	indicate a path prefix, so as to use relative paths to locate files and templates
	//	server.path(internals.servers.options.files.relativeTo);
	//	server.table();
}