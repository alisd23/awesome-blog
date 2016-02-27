
const gulp = require('gulp');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const liveServer = require('gulp-live-server');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const changed = require('gulp-changed');
const clean = require('gulp-clean');
const jsonfile = require('jsonfile');
const babelConfig = jsonfile.readFileSync('./.babelrc');

const webpackDevConfig = require('./webpack/dev.config');
const webpackProdConfig = require('./webpack/prod.config');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const stream = require('webpack-stream');

var colors = require('colors');

const webpackPort = 9000;
const serverPort = 8000;

const paths = {
  'SRC': 'src/*',
   UNIVERSAL: ['universal/**/*.js', 'universal/**/*.jsx'],
   CLIENT: ['client/**/*.js', 'client/**/*.jsx'],
   SERVER: ['server/**/*.js', 'server/**/*.jsx'],
   BUILD: 'build',
   CONFIG: 'config.js',
 };

 /*
  * MAIN TASKS
  */
gulp.task('default', ['server', 'webpack-dev-server']);
gulp.task('compile', ['webpack:dev']);
gulp.task('prod', ['webpack:prod', 'compile-server']);

gulp.task('server', ['compile-server'], function() {
  const server = liveServer.new('compiled/server/boot.js');
  server.start();
  const compiledWatcher = gulp.watch(
    [...paths.SERVER, ...paths.UNIVERSAL, paths.CONFIG],
    { cwd: 'compiled' },
    () => {
      server.start();
      gutil.log(
        ('\n -----------------------------\n' +
        '|      SERVER RESTARTED       |' +
        '\n -----------------------------\n')
        .white);
    }
  );
  compiledWatcher.on('change', function(event) {
    gutil.log('COMPILED: '.magenta + 'File ' + event.path.cyan + ' was ' + event.type.green);
  });

  const srcWatcher = gulp.watch(
    [...paths.SERVER, paths.CONFIG],
    { cwd: 'src' },
    ['compile-server']
  );
  srcWatcher.on('change', function(event) {
    // console.log('hello'.green); // outputs green text
    gutil.log('SOURCE: '.magenta + 'File ' + event.path.cyan + ' was ' + event.type.green);
  });
});

gulp.task('clean', function () {
  return gulp.src('compiled/*')
    .pipe(clean());
});

/*
 * WEBPACK STUFF
 */
gulp.task('compile-server', [], function() {
  return gulp.src([...paths.SERVER, ...paths.UNIVERSAL, paths.CONFIG], { cwd: 'src', base: 'src' })
    .pipe(cached('babel'))
  	.pipe(sourcemaps.init())
    .pipe(babel(babelConfig))
  	.pipe(sourcemaps.write())
  	.pipe(gulp.dest('compiled'));
});

gulp.task('webpack:prod', [], function() {
  // Remove source maps

  return gulp.src(paths.SRC) // gulp looks for all source files under specified path
    .pipe(stream(webpackProdConfig)) // blend in the webpack config into the source files
    .pipe(gulp.dest(paths.BUILD));
});

gulp.task('webpack-dev-server', function(callback) {

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackDevConfig), {
    // Tell wepback to pass (proxy) all requests to our server
    hot: true,
    proxy: {
      '/' : `http://localhost:${serverPort}`
    }
  }).listen(webpackPort, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', `http://localhost:${webpackPort}/webpack-dev-server/index.html`);
  });
});
