'use strict';

var React = require('react');
//	Layouts
var Aside = require('./layouts/aside.jsx');
//	Components
var Hero = require('./components/Hero.jsx');

//	check if it's a browser requiring CSS
if (process.env.BROWSER) {
  require('../../client/styles/pages/_home.scss');
}

var BasePage = require('./pages/base.jsx');

var Home = React.createClass({
	render: function () {
		return (
			<BasePage>
				<Hero />
				<section id="home" className="left-col">Section Component</section>
				<Aside/>
			</BasePage>
		);
	}
});

module.exports = Home;