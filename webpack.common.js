const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundles/[name].js',
		chunkFilename: "bundles/[name].js"
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|webp)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
							esModule: false,
						}
					},
				],
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						interpolate: 'require',
						attrs: [':src'],
					}
				}
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]',
					}
				},
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-template-loader",
				query: {
					attributes: ['img:src']
				}}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/view/index.hbs',
			templateParameters: require('./src/view/index.json'),
			filename: "index.html"
		}),
		new CleanWebpackPlugin()
	]
};
