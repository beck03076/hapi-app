'use strict';

var gulp = require('gulp');
var env = require('gulp-env');
var nodemon = require('gulp-nodemon');
var lab = require('gulp-lab');
var betterConsole = require('better-console');

gulp.task('test', ['set-test-env', 'set-node-path'], function() {
  return gulp.src([
    'test/**/*.js',
    '!./{node_modules,node_modules/**}'
  ], { read: false })
  .pipe(lab({
    args: '-c -t 85',
    opts: {
      emitLabError: true
    }
  }));
});

gulp.task('set-test-env', function() {
  return env({
    vars: {
      NODE_ENV: 'test'
    }
  });
});

gulp.task('set-node-path', function() {
  return env({
    vars: {
      NODE_PATH: '.'
    }
  });
});

gulp.task('serve', function() {
  env({
    vars: {
      NODE_PATH: '.',
      NODE_ENV: 'development'
    }
  });

  nodemon({
    script: 'server.js',
    ext: 'js',
    nodeArgs: ['--debug']
  });
});

