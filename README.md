![Quantum sample home page](https://github.com/dmoncado/Quantum/blob/master/src/assets/images/quantum-home.png?raw=true)

# Launchpad — A Boilerplate for Front End Developers
Launchpad is a Bootstrapped, Gulp-powered, Sassified, front end boilerplate that's focused on automated web development. It comes with Browsersync, hot reloading, carousels, animations and much more. Launchpad is also built on top of Panini for easy HTML partials and templating {{  }}

### Baked-in Features:

* Bootstrap 5
* Gulp 4
* Sass
* Swiper.js
* Emergence.js
* Browsersync + hot reloading
* HTML Templating
* Popper.js
* Animate.css
* Boostrap Icons
* Compilation
* Autoprefixing
* Sourcemaps
* Concatenation
* Minification
* Linting
* Accessibility reports


### Details

Launchpad's primary features:

- Build on top of Bootstrap with baked-in mobile navigation.
-	Sass compilation and prefixing with Autoprefixer (using Sass 7-1 folder architecture pattern).
- CSS minification after all SCSS is compiled.
- JavaScript concatenation + minification.
-	Built-in BrowserSync server - this will automatically reload your page when files are changed. It also live-injects CSS changes when you save a .SCSS file. This task runs continuously and defaults to localhost.
-	HTML templates with Panini. Panini is a super simple flat file generator for use with Gulp. It compiles a series of HTML pages using a common layout. These pages can also include HTML partials (rejoice!).


### Requirements

To use Launchpad, you'll need:

-	Node.js | Test: run ` node -v ` in the terminal
-	npm | (Node comes with npm installed). Test: run ` npm -v`  in the terminal
-	Gulp | `npm install -g gulp`


### Installing & Use:

- Clone this repo: `git clone https://github.com/dmoncado/launchpad`
- Navigate into the repo directory: `cd launchpad`
- Install all node packages: `npm install` or `sudo npm install`
- Run `gulp dev`
- Your site is now viewable at: http://localhost:3000
- Build something great (start from the HTML partials and style with the SCSS partials, go nuts.)

🚨 Changes should be committed to `src/` files only 🚨

Primary Gulp tasks are:
-	`gulp dev` for general development
-	`gulp build` for production ready builds — compiles, concatenates, and minifies everything into a folder called `/dist`

### Folder Structure:

- `dist/` - compiled files (minified and concatenated only with `gulp prod`)
- `node_modules` - front-end dependencies (.gitignore'd)
- `src/` - contains all of your core, working files — static assets, pages, templates, etc.
- `src/assets/` - scss files, JS files, images, and fonts
- `src/layouts/` - HTML layouts templates
- `src/pages/` - site pages
- `src/partials/` - HTML Partials
- `gulpfile.js` - all task definitions
- `package.json` - handles the front-end dependencies


Happy Coding </>
