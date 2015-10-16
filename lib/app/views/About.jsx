'use strict';

var React = require('react');

var BasePage = require('./pages/base.jsx');

var About = React.createClass({
	render: function () {
		return (
			<BasePage>
				<p>About us!</p>
			</BasePage>
		);
	}
});

module.exports = About;
