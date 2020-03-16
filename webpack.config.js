const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');

const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/server.ts',
	target: "node",
	output: {
		path: path.join(__dirname, 'dist/'), // express static folder is at /app/lib
		filename: '[name].js', // the file name of the bundle to create. [name] is,
	},
	devtool: 'source-map',
	plugins: [
		new webpack.ProgressPlugin(),
		new workboxPlugin.GenerateSW({
			swDest: 'sw.js',
			clientsClaim: true,
			skipWaiting: false
		})
	],

	module: {
		rules: [
			{
				test: /.(ts|tsx)?$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
			},
			{
				test: /\.(env)?$/,
				include: path.join(__dirname, 'environments'),
				use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'environment/'
						}
					}]
			}
		]
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	optimization: {
		minimize: false,
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i
			}),
		],

		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	}
};
