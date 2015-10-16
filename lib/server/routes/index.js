var config = require('../../../config');
var handlers = require(config.paths.server + '/handlers');
var path = require('path');


var routes = [
//	FAVICON
{
	method: 'GET',
	path: '/favicon.ico',
	handler: {
		file: path.join(config.paths.base + '/favicon.ico')
	}
},
//	JS FILES
{
	method: 'GET',
	path: '/js/{file}',
	handler: {
		directory: {
			path: config.assets.js.paths.output
		}
	}
},
//	CSS FILES
{
	method: 'GET',
	path: '/css/{file}',
	handler: {
		directory: {
			path: config.assets.css.paths.output
		}
	}
},
//	IMAGES
{
	method: 'GET',
	path: '/images/{file}',
	handler: {
		directory: {
			path: config.assets.images.paths.output
		}
	}
}

];


module.exports = routes;
