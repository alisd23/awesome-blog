
import path from 'path';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';  //gross
import isomorphicToolsConfig from '../../webpack/webpack-isomorphic-tools';
import { install } from 'source-map-support';

// Enable node source maps
install();

/**
 * Define isomorphic constants.
 */
const __CLIENT__ = false;
const __SERVER__ = true;
const __DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
const __DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

const webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicToolsConfig)
  .development(__DEVELOPMENT__);

webpackIsomorphicTools.server(path.resolve(__dirname, '../../'), () => {
  const server = require('./server').default;
  server(webpackIsomorphicTools, __DEVELOPMENT__);
});
