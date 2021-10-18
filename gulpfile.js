'use strict';
const {src, dest, watch, series } = require('gulp');
const sass          = require('gulp-sass')(require('sass'));
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const browserSync   = require('browser-sync').create();
const panini        = require('panini');
const babel         = require('gulp-babel');


// compile SCSS into CSS
function compileSCSS() {
  console.log('----COMPILING SCSS!----');
  return src('src/assets/scss/main.scss')
	.pipe(sass({
	  outputStyle: 'expanded',
	  sourceComments: 'map',
	  sourceMap: 'scss',
	}).on('error', sass.logError))
	.pipe(autoprefixer('last 2 versions'))
	.pipe(sourcemaps.write())
	.pipe(dest('dist/assets/css'))
	.pipe(browserSync.stream());
}

// compile HTML files and partials using Panini
function compileHTML() {
  console.log('----COMPILING HTML WITH PANINI----');
  panini.refresh();
  return src('src/pages/**/*.html')
	.pipe(panini({
	  root: 'src/pages/',
	  layouts: 'src/layouts/',
	  partials: 'src/partials/'
	}))
	.pipe(dest('dist'))
	.pipe(browserSync.stream());
}

// compile JS
function compileJS() {
  console.log('----COMPILE JS----');
  return src('src/assets/js/**/*.js')
	.pipe(babel())
	.pipe(dest('dist/assets/js'))
	.pipe(browserSync.stream());
}

// resets Panini's cache of layouts and partials
function resetPages(done) {
  console.log('----CLEARING PANINI CACHE----');
  panini.refresh();
  done();
}

// browserSync
function browserSyncInit(done) {
  console.log('----BROWSER SYNC----');
  browserSync.init({
	notify: false,
	server: './dist'
  });
  return done();
}

// watch files
function watchFiles() {
  watch('src/**/*.html', compileHTML);
  watch(['src/assets/scss/**/*.scss', 'src/assets/scss/*.scss'], compileSCSS);
  watch(['src/assets/js/**/*.js', 'src/assets/js/*.js'], compileJS);
}

// gulp dev
exports.dev = series(compileHTML, compileJS, resetPages, compileSCSS, browserSyncInit, watchFiles);
