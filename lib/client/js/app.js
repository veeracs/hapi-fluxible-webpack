'use strict';

import React from 'react';
import Router from 'react-router';

import app from '../../app';		//	Fluxible App
import navigateAction from '../../app/actions/navigate';

//	The FluxibleComponent is a wrapper component that will provide all of its children
//	with access to the Fluxible component context via React's childContextTypes and getChildContext.
//	This should be used to wrap your top level component.
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';

window.React = React; // For chrome dev tool support

const dehydratedState 	= window.App; 	//	Sent from the server


function RenderApp(context, RouteHandler) {
	let mountNode = document.getElementById('fluxapp');
	let Handler = React.createFactory(RouteHandler);
	let rootElm = React.createElement(
		FluxibleComponent,								//	parent component
		{ context: context.getComponentContext() },		//	set context property on the DOM element
		Handler()										//	child component
	);

	console.log('Server Rendered node');
	//	console.log(mountNode.innerHTML);
	React.render(rootElm, mountNode, function() {
		console.log('React Rendered node');
		//	console.log(mountNode.innerHTML);
	});
}

app.rehydrate(dehydratedState, function(err, context) {
	if (err) {
		throw err;
	}

	window.context = context;

	let firstRender = true;

	let routesComponent = app.getComponent();

	Router.run(routesComponent, Router.HistoryLocation, function (Handler, state) {
		if (firstRender) {
			// Don't call the action on the first render on top of the server rehydration
            // Otherwise there is a race condition where the action gets executed before
            // render has been called, which can cause the checksum to fail.
            RenderApp(context, Handler);
            firstRender = false;
		} else {
			console.log('not first render');
			context.executeAction(navigateAction, state, function() {
				RenderApp(context, Handler);
			});
			firstRender = false;
		}
	});
});