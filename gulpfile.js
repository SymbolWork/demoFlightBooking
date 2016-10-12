'use strict'
const gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    spawn = require('child_process').spawn;
let node;

const jshint = require('gulp-jshint');

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */

// JS hint task
let jshintfn = function() {
  gulp.src('./src/**/*.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('default'));
}

let serverfn = function() {
  if (node) node.kill()
  node = spawn('node', ['app.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
}

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', function() {
  gulp.src(['./test/**/*.js'])
        .pipe(mocha())
        .once('error', (error) => {
          console.log(error);
            process.exit(1);
    });
  
  jshintfn(); 
  serverfn();

  gulp.watch(['./app.js', './src/**/*.js', './test/**/*.js'], ['default'])
  // Need to watch for sass changes too? Just add another watch call!
})

process.on('exit', function() {
    if (node) node.kill()
})