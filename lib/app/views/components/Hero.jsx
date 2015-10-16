'use strict';

var React = require('react');
var config = require('../../../../config');

if (process.env.BROWSER) {
	require('../../../client/images/scenary.jpg');
	require('../../../client/styles/components/_hero.scss');
}

var Hero = React.createClass({
	render: function () {
		return (
			<div className="hero">
				<div className="hero-inner">
					<a href="" className="hero-logo">
						<img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1.png" alt="Hero Logo" />
					</a>
					<div className="hero-copy">
						<h1>Short description of Product</h1>
						<p>A few reasons why this product is worth using, who it's for and why they need it.</p>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Hero;