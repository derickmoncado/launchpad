'use strict';
const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const panini = require('panini');
const babel = require('gulp-babel');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const removeCode = require('gulp-remove-code');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const htmlreplace = require('gulp-html-replace');
const sass = require('gulp-sass')(require('sass')); // Updated to use Dart Sass

/* ---------------------------------------------------
    Dev tasks
--------------------------------------------------- */

// compile SCSS into CSS
function compileSCSS() {
  console.log('----COMPILING SCSS!----'); 
  return src('src/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.stream());
}

// compile HTML files and partials using Panini
function compileHTML() {
  console.log('----COMPILING HTML WITH PANINI!----');
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
  console.log('----COMPILING JS!----');
  return src('src/assets/js/**/*.js')
    .pipe(babel())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/assets/js'))
    .pipe(browserSync.stream());
}

// resets Panini's cache of layouts and partials
function resetPages(done) {
  console.log('----CLEARING PANINI CACHE!----');
  panini.refresh();
  done();
}

// browserSync
function browserSyncInit(done) {
  console.log('----BROWSER SYNC!----');
  browserSync.init({
    notify: false,
    server: './dist'
  });
  done();
}

// copy and minify images to dist
function copyImages() {
  console.log('----COMPILING IMAGES!----');
  return src('src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(dest('dist/assets/images/'))
    .pipe(browserSync.stream());
}

// places font files in dist
function copyFont() {
  console.log('----COPYING FONTS INTO DIST FOLDER!----');
  return src([
      'src/assets/fonts/*',
    ])
    .pipe(dest('dist/assets/fonts'))
    .pipe(browserSync.stream());
}

// deletes dist folder
function cleanDist(done) {
  console.log('----REMOVING OLD FILES FROM DIST!----');
  del.sync('dist');
  done();
}

// watch files
function watchFiles() {
  watch('src/**/*.html', compileHTML);
  watch(['src/assets/scss/**/*.scss', 'src/assets/scss/*.scss'], compileSCSS);
  watch(['src/assets/js/**/*.js', 'src/assets/js/*.js'], compileJS);
  watch('src/assets/images/**/*', copyImages);
}

/* ---------------------------------------------------
    Build tasks
--------------------------------------------------- */

// concatenate all js files
function concatScripts() {
  console.log('----CONCATINATING SCRIPTS!----');
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

// minify scripts
function minifyScripts() {
  console.log('----MINIFYING SCRIPTS!----');
  return src('dist/assets/js/main.js')
    .pipe(removeCode({
      production: true
    })) 
    .pipe(uglify().on('error', console.error))
    .pipe(rename('main.min.js'))
    .pipe(dest('dist/assets/js'));
}

// minify css
function minifyCss() {
  console.log('----MINIFYING CSS!----');
  return src([
      'dist/assets/css/main.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(dest('dist/assets/css'));
}

// change to minified versions of js and css
function renameSources() {
  console.log('----RENAMING SOURCES!----');
  return src('dist/*.html')
    .pipe(htmlreplace({
      'js': 'assets/js/main.min.js',
      'css': 'assets/css/main.min.css'
    }))
    .pipe(dest('dist/'));
}

// TASK: $ gulp dev
exports.dev = series(
  cleanDist,
  copyFont, 
  copyImages, 
  resetPages,
  compileHTML, 
  compileJS,
  compileSCSS,
  browserSyncInit,
  watchFiles
);

// TASK: $ gulp build
exports.build = series(
  cleanDist, 
  compileSCSS, 
  copyFont, 
  copyImages, 
  resetPages,
  compileHTML, 
  concatScripts, 
  minifyScripts, 
  minifyCss, 
  renameSources, 
  browserSyncInit
);