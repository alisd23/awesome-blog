const webpack = require('webpack');
const path = require('path');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './build');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const shared = require('./shared-config')(webpackIsomorphicToolsPlugin);

// const ip = '192.168.0.2';
const ip = null;
const hostname = ip || 'localhost';

module.exports = Object.assign({},
	// Include shared config
	shared.main,
	{
		cache: true,
		// debug: true,
		output: Object.assign({},
			{
				publicPath: `http://${hostname}:9000/`
			},
			shared.output
		),
		pathInfo: true,
	  devtool: 'cheap-module-inline-source-map',
		entry: [
	    `webpack-dev-server/client?http://${hostname}:9000`, // WebpackDevServer host and port
	    'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
			'./src/client/app.jsx'
		],
	  plugins: shared.plugins.concat([
	    new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
	    new webpack.DefinePlugin({
	      __CLIENT__: true,
	      __SERVER__: false,
	      __DEVELOPMENT__: true,
	      __DEVTOOLS__: true
	    }),
			webpackIsomorphicToolsPlugin.development()
	  ]),
		module: {
			loaders: shared.loaders.concat([
	      {
					test: /\.scss$/,
					include: path.join(projectRootPath, 'src'),
					loaders: [
						{
							loader: 'style',
							query: {
								singleton: true
							}
						},
						{
							loader: 'css',
							query: {
								sourceMap: true,
								importLoaders: 2
							}
						},
						{ loader: 'postcss' },
						{
							loader: 'sass',
							query: {
								sourceMap: true,
								outputStyle: 'expanded'
							}
						},
					]
				}
			])
		},
	}
);
