require('babel-polyfill');

var gulp = require('gulp'),
  babel = require('gulp-babel'),
  clean = require('gulp-clean'),
  webpack = require('gulp-webpack'),
  runSequence = require('run-sequence'),
  del = require('del'),
  path = require('path');

var bases = {
 dist: 'dist/'
};

var paths = {
 scripts: ['src/js/**/*.jsx'],
 css: ['src/css/*.css'],
 html: ['src/pages/*.html']
};

// Delete the dist directory
gulp.task('clean', () => {
 return gulp.src(bases.dist)
 .pipe(clean({force: true}));
});

gulp.task('scripts', () => {
  gulp.src('./src/js/index.js')
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest(bases.dist + 'js'));
});

gulp.task('copy', () => {
	// Copy html
 	gulp.src(paths.html)
 	.pipe(gulp.dest(bases.dist));

 	gulp.src(paths.css)
 	.pipe(gulp.dest(bases.dist + "css/"));
});

gulp.task('build', () => {
    runSequence('clean', ['scripts', 'copy']);
});

gulp.task('default', ['build']);
