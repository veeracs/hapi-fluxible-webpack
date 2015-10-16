'use strict';

var indexController = require('../controllers/index');


exports.index = function index(request, reply) {
	indexController(request, reply);
};
