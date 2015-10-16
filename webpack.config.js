var path = require('path');

var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;
//	ExtractTextPlugin creates a stylesheet bundle in parallel to the js bundle
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./config');

var sassLoaders = [
    'css-loader?sourceMap',
    'sass-loader?includePaths[]=' + bourbon
];

module.exports = {
	entry: [
		config.paths.client + '/index.js'
	],
	output: {
		path: config.paths.build,
		filename: '/js/bundle.js'
	},
	module: {
		loaders: [{
            test: /\.js$/,
            loader: "eslint-loader",
            exclude: /node_modules/
        }, {
			test: /\.(js|jsx)$/,
			loader: 'babel-loader',	//	transforms ES2015 and JSX
			exclude: /node_modules/
		}, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
            exclude: /node_modules/
		}, {
			test: /\.(png|gif|jpg|jpeg)$/,
			loader: "file-loader?name=images/[name].[ext]"
        }]
	},
	plugins: [
		new ExtractTextPlugin('/css/base.css'),
		new webpack.DefinePlugin({
	        'process.env': {
	            BROWSER: JSON.stringify(true)
	        }
    	})
  	]
};

