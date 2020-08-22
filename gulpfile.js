const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const log = require('gulplog');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const assign = require('lodash.assign');
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

const jsBundle = () => {
  return b
    .bundle()
    .on('error', log.error.bind(log, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
};

b.on('update', jsBundle);
b.on('log', log.info);

const htmlMini = () => {
  return gulp
    .src('./frontend/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
};

exports.default = () => {
  gulp.watch(
    [
      './frontend/*.js',
      './frontend/**/*.js',
      './frontend/*.jsx',
      './frontend/**/*.jsx',
    ],
    gulp.series(jsBundle)
  );
  gulp.watch('./frontend/*.html', htmlMini);
};
