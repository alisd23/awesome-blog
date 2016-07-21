const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './build');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const shared = require('./shared-config')(webpackIsomorphicToolsPlugin);

const extractSASS = new ExtractTextPlugin({
	filename: '[name].css',
	allChunks: true
});

module.exports = Object.assign({},
	// Include shared config
	shared.main,
	{
	  devtool: false,
		colors: true,
		'display-error-details': true,
		entry: [
			'./src/client/app.jsx'
		],
		output: Object.assign({},
			{
				publicPath: '/'
			},
			shared.output
		),
	  plugins: shared.plugins.concat([
			new CleanPlugin(
				[assetsPath],
				{ root: projectRootPath }
			),
	    new webpack.DefinePlugin({
	      __CLIENT__: true,
	      __SERVER__: false,
	      __DEVELOPMENT__: false,
	      __DEVTOOLS__: false,
				'process.env': {
	        // Useful to reduce the size of client-side libraries, e.g. react
	        NODE_ENV: JSON.stringify('production')
	      }
	    }),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: false,
				compress: {
	        warnings: false
		    }
			}),

			new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

			// Optimisations
	    new webpack.optimize.DedupePlugin(),
	    new webpack.optimize.OccurrenceOrderPlugin(),
			webpackIsomorphicToolsPlugin,

			// Extract CSS
	    extractSASS
	  ]),
		module: {
			loaders: shared.loaders.concat([
	      {
	        test: /\.scss$/,
	        loader: extractSASS.extract({
						fallbackLoader: 'style',
						loader: ['css?importLoaders=1&minimize', 'postcss', 'sass']
					}),
					include: path.join(projectRootPath, 'src')
	      }
			])
		},
	}
);
