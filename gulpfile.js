// gulpfile.js
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const tailwindcss = require('tailwindcss');

// Paths for files
const paths = {
  css: {
    src: 'src/tailwind.css',  // Source Tailwind CSS file
    dest: 'dist/css'                  // Output folder for processed CSS
  },
  html: {
    src: 'src/**/*.html'              // Source HTML files
  }
};

// Tailwind CSS build task
function buildCSS() {
  return gulp.src(paths.css.src)
    .pipe(postcss([tailwindcss, require('autoprefixer')]))  // Process with Tailwind and Autoprefixer
    .pipe(cssnano())                                         // Minify CSS
    .pipe(gulp.dest(paths.css.dest))                         // Output CSS file
    .pipe(browserSync.stream());                             // Inject CSS changes without page reload
}

// HTML reload task
function reloadHTML() {
  return gulp.src(paths.html.src)
    .pipe(browserSync.stream());
}

// Watch for changes and reload
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './src'  // Serve files from the 'src' directory
    }
  });
  gulp.watch('tailwind.config.js', buildCSS);      // Rebuild CSS on Tailwind config change
  gulp.watch(paths.css.src, buildCSS);             // Rebuild CSS on Tailwind CSS file change
  gulp.watch(paths.html.src, reloadHTML);          // Reload on HTML file change
}

// Define default Gulp task
exports.default = gulp.series(buildCSS, watchFiles);
