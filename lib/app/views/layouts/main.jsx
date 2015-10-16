'use strict';

var React = require('react');

var Main = React.createClass({
	render: function () {
		return (
			<main className="row">{this.props.children}</main>
		);
	}
});

module.exports = Main;
