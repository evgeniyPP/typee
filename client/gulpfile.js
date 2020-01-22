const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const gcmq = require('gulp-group-css-media-queries');
const babel = require('gulp-babel');

const isDev = process.argv.includes('--dev');
const isSync = process.argv.includes('--sync');

const cssFiles = ['./src/css/global.css', './src/css/index.css', './src/css/x-styles.css'];

function clear() {
  return del('build/*');
}

function styles() {
  return gulp
    .src(cssFiles)
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(gcmq())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(gulpif(!isDev, cleanCSS({ level: 2 })))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./build/css'))
    .pipe(gulpif(isSync, browserSync.stream()));
}

function scripts() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(gulpif(!isDev, babel({ presets: ['@babel/env'] })))
    .pipe(gulpif(!isDev, uglify()))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./build/js'))
    .pipe(gulpif(isSync, browserSync.stream()));
}

function img() {
  return gulp.src('./src/img/**/*').pipe(gulp.dest('./build/img'));
}

function html() {
  return gulp
    .src('./src/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(gulpif(isSync, browserSync.stream()));
}

function assets() {
  return gulp.src('./src/assets/**/*').pipe(gulp.dest('./build/assets'));
}

function watch() {
  if (isSync) {
    browserSync.init({
      server: {
        baseDir: './build'
      }
    });
  }

  gulp.watch('./src/*.html', html);
  gulp.watch('./src/css/**/*.css', styles);
  gulp.watch('./src/js/**/*.js', scripts);
}

const build = gulp.series(clear, gulp.parallel(styles, scripts, img, html, assets));

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
