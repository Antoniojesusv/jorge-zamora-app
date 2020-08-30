const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const log = require('gulplog');
const sourcemaps = require('gulp-sourcemaps');
const assign = require('lodash.assign');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');

const customOpts = {
  entries: ['./frontend/main.js'],
  debug: true,
};

const opts = assign({}, watchify.args, customOpts);
const b = watchify(
  browserify(opts).transform(babelify, {
    presets: ['@babel/preset-env', '@babel/preset-react'],
  })
);

const jsBundle = function () {
  return b
    .bundle()
    .on('error', log.error.bind(log, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
};

b.on('update', jsBundle);
b.on('log', log.info);

const htmlMini = function () {
  return gulp
    .src('./frontend/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
};

const css = function () {
  return gulp
    .src('./frontend/**/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
};

const browserSyncTask = function (done) {
  browserSync.init({
    proxy: 'http://xiwily4.local:8080/',
  });
  done();
};

const watchFiles = function () {
  gulp.watch('./frontend/**/*.css', css);
  gulp.watch(
    [
      './frontend/*.js',
      './frontend/*.jsx',
      './frontend/**/*.js',
      './frontend/**/*.jsx',
    ],
    jsBundle
  );
  gulp.watch(['./frontend/*.html', './frontend/**/*.html'], htmlMini);
};

const build = gulp.series(htmlMini, css, jsBundle);
const watch = gulp.parallel(watchFiles, browserSyncTask);

exports.watch = watch;
exports.default = build;
