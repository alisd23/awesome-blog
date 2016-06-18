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
const exec = require('child_process').exec;
const prompt = require('gulp-prompt');
const nodemon = require('gulp-nodemon');
const jsonfile = require('jsonfile');
const babelConfig = jsonfile.readFileSync('./.babelrc');

const webpackDevConfig = require('./webpack/dev.config');
const webpackProdConfig = require('./webpack/prod.config');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const stream = require('webpack-stream');

const colors = require('colors');

const webpackPort = 9000;
const serverPort = 8000;
// const ip = '192.168.0.2';
const ip = undefined;
const hostname = ip || 'localhost';


const paths = {
  'SRC': 'src',
  'ENTRY': 'src/client/app.jsx',
   UNIVERSAL: ['universal/**/*.js', 'universal/**/*.jsx'],
   CLIENT: ['client/**/*.js', 'client/**/*.jsx'],
   SERVER: ['server/**/*.js', 'server/**/*.jsx'],
   BUILD: 'build',
   CONFIG: 'config.js',
   COMPILED: 'compiled'
 };


 /*
  * TASK LIST
  * ---------------------
  * 1) [gulp] (default) - runs [gulp dev]
  * 2) [gulp dev]       - Compiles with hot reloading, starts dev server, listens for changes
  * 3) [gulp prod]       - Compiles production code, starts prod server
  * 4) [gulp compile]   - Compiles production code only
  * 5) [gulp clean]     - Cleans compiled and build folder
  * 6) [gulp seed]      - Seeds MongoDB database with test data
  */

 /*
  * MAIN TASKS
  */
gulp.task('default', ['dev']);
gulp.task('dev', ['clean', 'compile-server:dev', 'server:dev', 'webpack-dev-server']);
gulp.task('prod', ['compile-server:prod', 'webpack:prod', 'server:prod']);
gulp.task('compile', ['compile-server:prod', 'webpack:prod']);

gulp.task('clean', function() {
  return gulp.src(['compiled', 'build/*'])
    .pipe(clean({force: true}));
});

/*
 * DATABASE SEEDING
 */
gulp.task('seed', ['compile-server:dev'], function(cb) {
  exec('node compiled/server/database/seeds/run', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

/*
 * SERVER TASKS
 */

function createServer() {
  return liveServer.new('compiled/server/boot.js');
}
function compileServer(dev) {
  var compilation = gulp
    .src(
      [...paths.SERVER, ...paths.UNIVERSAL],
      { cwd: 'src', base: 'src' }
    )
    .pipe(cached('babel'));

  if (dev) { compilation = compilation.pipe(sourcemaps.init()); }
  compilation = compilation.pipe(babel(babelConfig));
  if (dev) { compilation= compilation.pipe(sourcemaps.write()); }
  return compilation = compilation.pipe(gulp.dest('compiled'));
}

gulp.task('compile-server:prod', ['clean'], compileServer);
gulp.task('compile-server:dev', ['clean'], () => compileServer(true));

gulp.task('server:prod', ['webpack:prod'], () => {
  const server = createServer();
  server.start();
});
gulp.task('server:dev', ['compile-server:dev'], () => {
  const srcWatcher = gulp.watch(
    [...paths.SERVER, ...paths.UNIVERSAL],
    { cwd: 'src' },
    compileServer
  );
  srcWatcher.on('change', function(event) {
    gutil.log('SOURCE: '.magenta + 'File ' + event.path.cyan + ' was ' + event.type.green);
  });

  nodemon({
    script: 'compiled/server/boot.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    watch: [paths.COMPILED]
  });
});


/*
 * WEBPACK TASKS
 */

gulp.task('webpack:prod', function() {
  return gulp.src(paths.ENTRY) // gulp looks for all source files under specified path
    .pipe(stream(webpackProdConfig, webpack)) // blend in the webpack config into the source files
    .pipe(gulp.dest(paths.BUILD));
});

gulp.task('webpack-dev-server', ['server:dev'], function(callback) {
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackDevConfig), {
    // Tell wepback to pass (proxy) all requests to our server
    hot: true,
    open: `http://${hostname}:9000/webpack-dev-server/`,
    noInfo: true,
    stats: {
      colors: true
    },
    proxy: {
      '/' : `http://${hostname}:${serverPort}`
    }
  }).listen(webpackPort, hostname, function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', `http://${hostname}:${webpackPort}/webpack-dev-server/index.html`);
  });
});
