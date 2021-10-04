'use strict';
const {src, dest, watch, series } = require('gulp');
const sass          = require('gulp-sass')(require('sass'));
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const browserSync   = require('browser-sync').create();


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
	.pipe(dest('css'))
	.pipe(browserSync.stream());
}

// browserSync
function browserSyncInit(done) {
  console.log('----BROWSER SYNC----');
  browserSync.init({
	notify: false,
	server: './'
  });
  return done();
}

// watch files
function watchFiles() {
  watch(['src/assets/scss/**/*.scss', 'src/assets/scss/*.scss'] , compileSCSS);
  // watch('src/assets/js/*.js', compileJS); let not worry about this yet
}

// gulp dev
exports.dev = series(compileSCSS, browserSyncInit, watchFiles);
