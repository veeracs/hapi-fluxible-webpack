'use strict';

/*
 * node-jsx allows us to require JSX files as if they were regular JS files, without having to worry about compiling
 * parses JSX and enables ES6/7 transpiling
 */

require('node-jsx').install({extension: '.jsx', harmony: true});

let Hapi = require('hapi');
let React = require('react');
let Router = require('react-router');
let serialize = require('serialize-javascript');

//	App Configuration
let config = require('../../config');

//	Path to Fluxible App
let app = require(config.paths.app);

//	Action dispatched on route change
let navigateAction = require(config.paths.app + '/actions/navigate');

//	App shell/root component
let HtmlComponent = React.createFactory(require(config.paths.app + '/views/Html.jsx'));

let routes = require(config.paths.server + '/routes');

//	create server
let server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 7777
});

//	setup routes
server.route(routes);

//	intercept dynamic requests, fire-up React Router and modify the response object
server.ext('onPostHandler', function(request, reply) {

	if (typeof request.response.statusCode !== 'undefined') {
		return reply.continue();
	}

	/*
	 * Fluxible has context interfaces for Action Creators, Components and Stores
	 * which provides access to Flux methods - Action Context provides dispatch, executeAction, and getStore
	 * Create a new fluxible instance per request/session
	 * Provides isolation of stores, dispatches, and other data so that
	 * it is not shared between requests on the server side
	*/

	//	context is an encapsulation mechanism to prevent data from leaking between requests
	let context = app.createContext();
	Router.run(app.getComponent(), request.path, function(Handler, state) {

		/*
		 * Entry point into an application's execution
		 * navigateAction inspects router's state to look for a matching route.
		 * If a match is found, a 'CHANGE_ROUTE_SUCCESS' action is dispatched.
		 * If a match is not found, an error with 404 status is provided to the callback.
		 * 'CHANGE_ROUTE_SUCCESS' action is dispatched to all stores registered with the app.
		 */

		context.executeAction(navigateAction, state, function() {

			/*
			* Exposing our app's server-rendered state so React can re-initialize
			* client-side on top of the existing DOM.
			*
			* Dispatchr provides dehydrate/rehydrayte functions that will serialize
			* data from all registered stores.
			*
			* We create a string variable to pass into the HtmlComponent below,
			* which will be rendered as JavaScript to create an App variable on
			* the global window object.
			*
			* On the server the app state is bound to each request,
			* i.e. there is one state per request (since a server serves multiple client requests)
			* On the client, the app state is global, i.e. we only need one state for the whole browser session
			*/

			let exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

			//	renderToString creates a new instance of our router's root component (App.jsx) and renders it to a string
			//	Since the Application component gets its state from the ApplicationStore, the correct page is rendered.

			let Component = React.createFactory(Handler);

			//	Render application component into HTML

			let html = React.renderToStaticMarkup(HtmlComponent({
				title: 'Hapi Fluxible Webpack Starter Kit',
				state: exposed,
				markup: React.renderToString(Component({context: context.getComponentContext()})),
				context: context.getComponentContext()
			}));

			reply(html);
		});
	});
});

//	start server
server.start(function() {
	console.log('Server running at: ' + server.info.uri);
});
