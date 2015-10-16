'use strict';

var createStore = require('fluxible/addons').createStore;

/*
 * AppStore keeps track of which route should be rendered
 * AppStore executes its handleNavigate() method in response to
 * the 'CHANGE_ROUTE_SUCCESS' action, and updates its state
 */

var AppStore = createStore({
	storeName: 'AppStore',
	handlers: {
		'CHANGE_ROUTE': 'handleNavigate'
	},
	initialize: function () {
		this.currentRoute = null;
	},

	/*
	 *	Action handler for route change
	 */
	handleNavigate: function (route) {
        if (this.currentRoute && route.path === this.currentRoute.path) {
            return;
        }
        this.currentRoute = route;
        this.emitChange();
	},
	getState: function () {
        return {
            route: this.currentRoute
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.currentRoute = state.route;
    }
});

module.exports = AppStore;
