'use strict';

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

//	components
var App 	= require('./App.jsx');
var Home    = require('./Home.jsx');
var About   = require('./About.jsx');

//	react routes
var routes = (
  <Route name="app" path="/" handler={App}>
	<Route name="about" path="/about" handler={About} />
    <DefaultRoute name="home" handler={Home} />
  </Route>
);

module.exports = routes;