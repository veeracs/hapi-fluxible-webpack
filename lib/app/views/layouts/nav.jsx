'use strict';

var React = require('react');

var Nav = React.createClass({
	render: function () {
		return (
			<nav>
				<ul>
					<li><a className="selected" href="#">Home</a></li>
					<li><a href="#">About</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
			</nav>
		);
	}
});

module.exports = Nav;
