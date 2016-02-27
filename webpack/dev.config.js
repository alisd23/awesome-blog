const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const combineLoaders = require('./combine-loaders');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './build');

module.exports = clientConfig = {
	context: path.resolve(__dirname, '..'),
	progress: true,
	cache: true,
	debug: true,
  devtool: 'source-map',
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	entry: [
    'webpack-dev-server/client?http://localhost:9000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
		'./src/client/app.jsx'
	],
	output: {
		path: path.join(projectRootPath, 'build/'),
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
	},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
		webpackIsomorphicToolsPlugin.development()
  ],
	postcss: [
    autoprefixer({
      browsers: ['last 3 versions']
    })
  ],
	module: {
		loaders: [
      {
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loaders: combineLoaders([
					{ loader: 'react-hot' },
					{
						loader: 'babel',
						cacheDirectory: true,
						query: {
							presets: ['react', 'es2015', 'stage-2'],
							plugins: ['transform-class-properties']
						}
					},
				])
			},
      {
				test: /\.scss$/,
				loaders:  combineLoaders([
					{ loader: 'style' },
					{
						loader: 'css',
						query: {
							sourceMap: true,
							importLoaders: 1
						}
					},
					{
						loader: 'sass',
						query: {
							sourceMap: true,
							outputStyle: 'expanded'
						}
					},
				])
			},
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
		]
	},
};
