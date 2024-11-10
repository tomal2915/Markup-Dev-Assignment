const gulp = require('gulp');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano'); // for minifying CSS

// Define paths
const paths = {
  css: {
    src: 'src/tailwind.css', // Source Tailwind file
    dest: 'dist/css' // Destination folder for built CSS
  }
};

// CSS task to build Tailwind CSS
function buildCSS() {
  return gulp
    .src(paths.css.src)
    .pipe(postcss([tailwindcss, autoprefixer, cssnano]))
    .pipe(gulp.dest(paths.css.dest));
}

// Define a build task
gulp.task('build', buildCSS);
