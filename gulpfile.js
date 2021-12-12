'use strict';
const {src, dest, watch, series } = require('gulp');
const sass          = require('gulp-sass')(require('sass'));
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const browserSync   = require('browser-sync').create();
const panini        = require('panini');
const babel         = require('gulp-babel');
const del           = require('del');
const concat        = require('gulp-concat');


/* ---------------------------------------------------
	Dev tasks
--------------------------------------------------- */

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

// copy and minify images to dist
function copyImages() {
  console.log('----COMPILING IMAGES----');
  return src('src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
	.pipe(dest('dist/assets/images/'))
	.pipe(browserSync.stream());
}

// places font files in dist
function copyFont() {
  console.log('----COPYING FONTS INTO DIST FOLDER----');
  return src([
	  'src/assets/fonts/*',
	])
	.pipe(dest('dist/assets/fonts'))
	.pipe(browserSync.stream());
}

// deletes dist folder
function cleanDist(done) {
  console.log('----REMOVING OLD FILES FROM DIST----');
  del.sync('dist');
  return done();
}

// watch files
function watchFiles() {
  watch('src/**/*.html', compileHTML);
  watch(['src/assets/scss/**/*.scss', 'src/assets/scss/*.scss'], compileSCSS);
  watch(['src/assets/js/**/*.js', 'src/assets/js/*.js'], compileJS);
  watch('src/assets/images/**/*', copyImages);
}


/* ---------------------------------------------------
	Prod tasks
--------------------------------------------------- */

// change to minified versions of js and css
// function renameSources() {
//   console.log('----RENAMING SOURCES----');
//   return src('dist/*.html')
// 	.pipe(htmlreplace({
// 	  'js': 'assets/js/main.min.js',
// 	  'css': 'assets/css/main.min.css'
// 	}))
// 	.pipe(dest('dist/'));
// }

// concatenate all js files
function concatScripts() {
  console.log('----CONCATINATE SCRIPTS----');
  return src([
	  'src/assets/js/vendor/bootstrap.bundle.js',
	  'src/assets/js/vendor/emergence.js',
		'src/assets/js/vendor/swiper-bundle.js',
	  'src/assets/js/*'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('main.js'))
	.pipe(sourcemaps.write('./'))
	.pipe(dest('dist/assets/js'))
	.pipe(browserSync.stream());
}




// TASK: gulp dev
exports.dev = series(cleanDist, copyFont, copyImages, compileHTML, compileJS, resetPages, compileSCSS, browserSyncInit, watchFiles);

// TASK: gulp prod
exports.prod = series(cleanDist, copyFont, copyImages, concatScripts, minifyScripts, compileHTML, browserSyncInit);
// tasks needed---- minifyScripts, minifyCss, renameSources  