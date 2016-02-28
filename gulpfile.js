
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
const prompt = require('gulp-prompt');
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
  'SRC': 'src',
  'ENTRY': 'src/client/app.jsx',
   UNIVERSAL: ['universal/**/*.js', 'universal/**/*.jsx'],
   CLIENT: ['client/**/*.js', 'client/**/*.jsx'],
   SERVER: ['server/**/*.js', 'server/**/*.jsx'],
   BUILD: 'build',
   CONFIG: 'config.js',
 };

 /*
  * MAIN TASKS
  */
gulp.task('default', ['dev']);
gulp.task('dev', ['compile-server:dev', 'server:dev', 'webpack-dev-server']);
gulp.task('prod', ['compile-server:prod', 'webpack:prod', 'server:prod']);
gulp.task('compile', ['webpack:dev']);

gulp.task('clean', function () {
  return gulp.src('compiled')
    .pipe(clean());
});


/*
 * SERVER TASKS
 */

function createServer() {
  return liveServer.new('compiled/server/boot.js');
}
function compileServer() {
  return gulp.src([...paths.SERVER, ...paths.UNIVERSAL, paths.CONFIG], { cwd: 'src', base: 'src' })
    .pipe(cached('babel'))
    .pipe(sourcemaps.init())
    .pipe(babel(babelConfig))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('compiled'));
}

gulp.task('compile-server:prod', [], compileServer);
gulp.task('compile-server:dev', [], compileServer);

gulp.task('server:prod', ['webpack:prod'], () => {
  const server = createServer();
  server.start();
});
gulp.task('server:dev', ['compile-server:dev'], () => {
  const server = createServer();
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
    ['compile-server:dev']
  );
  srcWatcher.on('change', function(event) {
    // console.log('hello'.green); // outputs green text
    gutil.log('SOURCE: '.magenta + 'File ' + event.path.cyan + ' was ' + event.type.green);
  });

  listenToInput(server)
});

function listenToInput(server) {
  gulp.src('src').pipe(prompt.prompt({
  		type: 'input',
  		name: 'key',
  		message: 'PRESS ENTER TO RESTART SERVER'
  	}, function(res) {
  		console.log("RESTARTING SERVER");
  		server.start();
      listenToInput(server);
  	}));
}


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
    open: 'http://localhost:9000/webpack-dev-server/',
    noInfo: true,
    stats: {
      colors: true
    },
    proxy: {
      '/' : `http://localhost:${serverPort}`
    }
  }).listen(webpackPort, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', `http://localhost:${webpackPort}/webpack-dev-server/index.html`);
  });
});
