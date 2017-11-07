import {settings} from './gulp/config';

const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const dev = {
	entry: {
		polyfills: './src/app/polyfills.js',
		vendor: './src/app/vendor.js',
		app: './src/app/index.js'
	},
	output: {
		path: path.join(__dirname, settings.destinations.dev.app),
		filename: '[name].bundle.js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		})
	]
};

const prod = {
	entry: {
		...dev.entry
	},
	output: {
		path: path.join(__dirname, settings.destinations.prod.app),
		filename: '[name].bundle.min.js'
	},
	plugins: [
		...dev.plugins,
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					drop_console: true, // eslint-disable-line camelcase
					drop_debugger: true // eslint-disable-line camelcase
				}
			}
		})
	]
};

module.exports = {dev, prod};
