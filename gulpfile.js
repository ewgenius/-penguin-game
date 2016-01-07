var gulp = require('gulp');
var path = require('path');
var bower = require('main-bower-files');

var $ = require('gulp-load-plugins')();

var conf = {
  paths: {
    src: 'src/client',
    compiled_ts: 'client/ts',
    compiled_js: 'client/js'
  }
};

function webpack(watch, callback) {
  var webpackOptions = {
    watch: watch,
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }]
    },
    output: {
      filename: 'app.js'
    }
  };
  return gulp.src(path.join(conf.paths.compiled_ts, '/app.js'))
    .pipe($.webpack(webpackOptions, null, () => {}))
    .pipe(gulp.dest(path.join(conf.paths.compiled_js)));
}


gulp.task('scripts', () => webpack(false));

gulp.task('html', () => gulp.src('src/client/index.html').pipe(gulp.dest('client')));

gulp.task('assets', () => gulp.src('src/client/assets/**/*.png').pipe(gulp.dest('client/assets')));

gulp.task('bower', () => gulp.src(bower()).pipe(gulp.dest('client/bower_components')));

gulp.task('watch', () => {
  gulp.watch([conf.paths.compiled_ts + '/**/*.js'], ['scripts']);

  gulp.watch(['src/client/index.html'], ['html']);

  gulp.watch(['src/client/assets/**/*.png'], ['assets']);
});
