
const gulp = require('gulp');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const liveServer = require('gulp-live-server');
const ts = require('gulp-typescript');

const tsconfig = require('./typescript/tsconfig.json');
const webpackDevConfig = require('./webpack/dev.config');
const webpackProdConfig = require('./webpack/prod.config');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const stream = require('webpack-stream');

const webpackPort = 9000;
const serverPort = 8000;

const paths = {
   HTML: 'index.html',
   TS: ['typescript/**/*.ts', 'typescript/**/*.tsx'],
   UNIVERSAL: ['javascript/universal/**/*.js'],
   CLIENT: ['javascript/client/**/*.js'],
   SERVER: ['javascript/server/**/*.js'],
   BUILD: 'build',
 };

 /*
  * MAIN TASKS
  */
gulp.task('default', ['webpack-dev-server', 'server']);
gulp.task('compile', ['webpack:dev']);
gulp.task('prod', ['webpack:prod', 'server']);

gulp.task('server', function() {
  const server = liveServer.new('javascript/server');
  server.start();
  gulp.watch([paths.SERVER, paths.UNIVERSAL, paths.HTML], () => server.start());
});


/*
 * WEBPACK STUFF
 */
// gulp.task('webpack:dev', [], function() {
//   const tsResult = gulp.src(paths.TS) // gulp looks for all source files under specified path
//     .pipe(ts(tsconfig)) // blend in the webpack config into the source files
//     .pipe(stream(webpackDevConfig)) // blend in the webpack config into the source files
//     .pipe(gulp.dest(paths.BUILD));
// });
gulp.task('webpack:prod', [], function() {
  // Remove source maps
  const tsconfigProd = Object.create(tsconfig);
  tsconfigProd.compilerOptions['inline-source-map'] = false;

  const tsResult = gulp.src(paths.TS) // gulp looks for all source files under specified path
    .pipe(ts(tsconfig)) // blend in the webpack config into the source files
    .pipe(stream(webpackProdConfig)) // blend in the webpack config into the source files
    .pipe(gulp.dest(paths.BUILD));
});

gulp.task('webpack-dev-server', function(callback) {

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackDevConfig), {
    // Tell wepback to pass (proxy) all requests to our server
    proxy: {
      '/' : `http://localhost:${serverPort}`
    }
  }).listen(webpackPort, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', `http://localhost:${webpackPort}/webpack-dev-server/index.html`);
  });
});
