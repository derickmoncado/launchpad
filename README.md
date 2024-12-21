![Launchpad sample home page](https://github.com/dmoncado/launchpad/blob/main/src/assets/images/launchpad-home.jpg)

# 🚨🚨🚨🚨 2025 UPDATE DROPPING SOON!! 🚨🚨🚨🚨

# Launchpad 🚀 — A Boilerplate for Front End Developers

Launchpad is a Bootstrapped, Gulp-powered, Sassified, front end boilerplate for static site development and is fully focused on automation. 

It comes with Browsersync, hot reloading, carousels, animations, icons, and much more!

Launchpad is also built on top of Panini for easy HTML partials and templating (rejoice). 

### Baked-in goodies:
- Bootstrap 5
- Bootstrap Icons
- Swiper.js
- Emergence.js
- Panini for HTML templating
- Popper.js
- Animate.css

### Baked-in automation:
- Gulp.js
- Sass
- Browsersync + hot reloading
- Compilation
- Autoprefixing
- Sourcemaps
- Concatenation
- Minification

### Details

- Build on top of Bootstrap with included mobile navigation and icons.
- Sass/CSS compilation, minification, and prefixing with Autoprefixer (using the Sass 7-1 folder architecture pattern).
- JavaScript concatenation + minification.
- Built-in BrowserSync Server - this will automatically refresh your page when files are changed. It also live-injects styles when a .SCSS file is saved.
- HTML partials and templating with Panini. Panini is a super simple flat file generator for use with Gulp. It compiles a series of HTML pages using a common layout. These pages can also include HTML partials for better markup organization.
- `build` task for shipping your project once it's complete.

### Requirements

To use Launchpad, you'll need:

- Node.js | Test: run `node -v` in the terminal
- npm | (Node comes with npm installed). Test: run ` npm -v` in the terminal
- Gulp | `npm install -g gulp`

### Installing & Use:

- Clone this repo: `git clone https://github.com/derickmoncado/launchpad`
- Navigate into the repo directory: `cd launchpad`
- Install all node packages: `npm install` or `sudo npm install`
- Run `gulp dev`
- Your site is now viewable at: http://localhost:3000
- Build something dope (start from the HTML partials and style with the SCSS partials, go nuts.)
### 🚨 Changes should be committed to `src/` files only 🚨

Primary Gulp tasks are:

- `gulp dev` for general development
- `gulp build` for production ready builds — compiles, concatenates, and minifies everything into a folder called `/dist`
- `/dist` contains your `index.html`, it's totally up to you how you want to serve/host that online for people to visit (I use GitHub Pages).

### Folder Structure:

- `dist/` - compiled files
- `node_modules` - front-end dependencies (these are .gitignore'd by default)
- `src/` - contains all of your core, working files — static assets, pages, templates, etc.
- `src/assets/` - scss files, JS files, images, and fonts
- `src/layouts/` - HTML layouts templates
- `src/pages/` - site pages
- `src/partials/` - HTML Partials
- `gulpfile.js` - all task definitions
- `package.json` - handles the front-end dependencies

Happy Coding </>
