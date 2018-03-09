const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
	entry: {
		bundle: SRC_DIR + '/index.jsx'
	},
	devtool: 'inline-source-map',
	plugins: [
		new CleanWebpackPlugin([BUILD_DIR]),
		new HtmlWebpackPlugin({
			template: SRC_DIR + '/index.html'
		})
	],
	output: {
		path: BUILD_DIR,
		filename: '[name].js'
	},
	node: {
		dns: 'mock',
		net: 'mock'
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /src\/header-scripts.html/,
				loader: 'file'
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist')
	}
};

module.exports = config;
