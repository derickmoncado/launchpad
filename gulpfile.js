'use strict';
const {src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');


// Compile SCSS into CSS
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
	.pipe(dest('dist/assets/css'));
	//.pipe(browserSync.stream());
}

exports.compileSCSS = compileSCSS;
