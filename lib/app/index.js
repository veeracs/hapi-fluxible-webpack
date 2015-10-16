'use strict';

var Fluxible = require('fluxible');

import AppStore from './stores/AppStore';


/*
 * Create a new Fluxible app instance,
 * Define App.jsx as a root/top-level component
 */

const app = new Fluxible({
    component: require('./views/Routes.jsx')
});


/*
 * Register a store to the dispatcher so it can listen for actions
 * @method registerStore
 */

app.registerStore(AppStore);

module.exports = app;
