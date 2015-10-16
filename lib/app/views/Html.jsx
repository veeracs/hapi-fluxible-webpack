'use strict';

var React  = require('react');

var Html = React.createClass({
	render: function() {
		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<title>{this.props.title}</title>
					<meta name="viewport" content="width=device-width, user-scalable=no" />
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<link rel="stylesheet" href="/css/base.css" />
				</head>
				<body>
					<div id="fluxapp" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
				</body>
				<script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
				<script src="/js/bundle.js" defer></script>
			</html>
		);
	}
});

module.exports = Html;