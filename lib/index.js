'use strict';

//	for CSS requires on server-side
delete process.env.BROWSER;

//	The server-side rendered React components and store instances get dehydrated
//	and sent to the client using express-state. The client.js (compiled by webpack)
//	then bootstraps and rehydrates the dispatcher instance and the stores
//	to same state as what they were on the server.

require('./server');
