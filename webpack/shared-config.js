const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './build');
const autoprefixer = require('autoprefixer');
const jsonfile = require('jsonfile');
const babelConfig = jsonfile.readFileSync('./.babelrc');

module.exports = function(webpackIsomorphicToolsPlugin) {

  return {
    main: {
      context: projectRootPath,
      progress: true,
      resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
      },
    	postcss: [
        autoprefixer({
          browsers: ['last 2 versions']
        })
      ]
    },

    output: {
      path: assetsPath,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js'
    },

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: [
          // {
          //   loader: 'webpack-strip',
          //   query: {
          //     strip: __DEVELOPMENT__ ? [] : ['console.debug']
          //   }
          // },
          { loader: 'react-hot' },
          {
            loader: 'babel',
            cacheDirectory: true,
            query: babelConfig
          },
        ]
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=15000' }
    ],

    plugins: [
      new webpack.IgnorePlugin(/webpack-stats\.json$/),
			new CopyPlugin([
				{ from: 'assets', to: 'assets' }
			])
    ]
  }
}
