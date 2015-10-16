'use strict';

var React = require('react');

var Header = require('../layouts/header.jsx');
var Nav = require('../layouts/nav.jsx');
var Footer = require('../layouts/footer.jsx');
var Main = require('../layouts/main.jsx');


var BasePage = React.createClass({
	render: function () {
		return (
			<div className="page-container">
				<Header />
				<Nav />
				<Main>{this.props.children}</Main>
				<Footer />
			</div>
		);
	}
});

module.exports = BasePage;