const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
	entry: './src/client/index.js',
	output: {
		path: path.join(__dirname, outputDirectory),
		filename: '[name].[hash].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
			{ test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
			{ test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
		]
	},
	resolve: {
		alias: {
			mdb: path.resolve(__dirname, 'src/client/MDB/index'),
			settingsManager: path.resolve(__dirname, 'src/client/util/settingsManager')
		},
	},
	devtool: "source-map",
	devServer: {
		port: 3000,
		open: true,
		proxy: {
			'/api': 'http://localhost:81'
		},
		historyApiFallback: true,
	},
	plugins: [
		new CleanWebpackPlugin([outputDirectory]),
		new HtmlWebpackPlugin({
			template: './panelHtml/panel.html',
			favicon: './panelHtml/polaris.ico',
			filename: "panel.html"

		})
	]
};


