var path = require('path');

const webpack = require('webpack');

module.exports = {
	entry: './src/App.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
		publicPath: '/'
	},
	watch: true,
	module: {
		loaders: [
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env','react', 'es2015', 'stage-1']
				}
			}
		]
	}
}