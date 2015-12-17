'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('server');
var assert = require('chai').assert;

lab.experiment('Email/pw authentication', function() {
  lab.test('Returns real users', function(done) {
    var options = {
      method: 'GET',
      url: '/realusers',
    };
    server.inject(options, function(response) {
      assert.equal(response.statusCode, 200);
      var result = JSON.stringify(response.result);
      var expected = JSON.stringify([{"row":[{"name":"Matthias Sieber","email":"matthiasksieber@gmail.com"}]}]);
      assert.strictEqual(expected, result);
      done();
    });
  });
  lab.test('Returns fake users', function(done) {
    var options = {
      method: 'GET',
      url: '/fakeusers',
    };
    server.inject(options, function(response) {
      assert.equal(response.statusCode, 200);
      var result = JSON.stringify(response.result);
      var expected = JSON.stringify([{"row":[{"name":"Test User","email":"test@example.com","isFake":true}]}]);
      assert.strictEqual(expected, result);
      done();
    });
  });
});

