const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: './index.js',
	devtool: 'inline-source-map',
	plugins: [
		new CleanWebpackPlugin(['build']),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html')
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'public/manifest.json'),
				to: path.resolve(__dirname, 'build/')
			},
			{
				from: path.resolve(__dirname, 'public/favicon.ico'),
				to: path.resolve(__dirname, 'build/')
			},
		]),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new UglifyJsWebpackPlugin({
			parallel: true,
			uglifyOptions: {
				minimize: true,
				compress: true,
				mangle: {
					toplevel: true
				},
			}
		})
	],
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: '/',
		filename: 'assets/js/bundle.[hash:8].js'
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json', '.less'],
		modules: [
			path.resolve(__dirname, "src/lib"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "src/components"),
			style: path.resolve(__dirname, "src/style"),
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	stats: { colors: true },
	devServer: {
		port: process.env.PORT || 8080,
		host: 'localhost',
		publicPath: '/',
		contentBase: path.join(__dirname, 'build'),
		historyApiFallback: true,
		open: true,
		hot: true,
		openPage: '',
		proxy: {

		}
	}
};
