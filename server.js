'use strict';

var Hapi = require('hapi');
var Boom = require('boom');
var rp = require('request-promise-json');
var constants = require('src/config/constants.js');
var host = constants.application.host;
var port = constants.application.port;
var commitURL = constants.database.commitUrl;
var server = new Hapi.Server({
  connections: {
    routes: {
      cors: {
        origin: ['*'] // to allow API requests from our front end later
      }
    }
  }
});

server.connection({ host: host, port: port });

server.route({
  method: 'GET',
  path: '/realusers',
  handler: function(request, reply) {
    var query = 'MATCH (user:User) WHERE NOT HAS (user.isFake) RETURN user';
    var options = {
      uri: commitURL,
      method: 'POST',
      body: { 'statements': [{'statement': query }] }
    };
    return rp.request(options).then(function(result) {
      if (result.results.length > 0) {
        return reply(result.results[0].data);
      } else {
        return reply(Boom.notFound());
      }
    });
  }
});

server.route({
  method: 'GET',
  path: '/fakeusers',
  handler: function(request, reply) {
    var query = 'MATCH (user:User) WHERE HAS(user.isFake) RETURN user';
    var options = {
      uri: commitURL,
      method: 'POST',
      body: { 'statements': [{'statement': query }] }
    };
    return rp.request(options).then(function(result) {
      if (result.results.length > 0) {
        return reply(result.results[0].data);
      } else {
        return reply(Boom.notFound());
      }
    });
  }
});

if (!module.parent) {
  server.start(function() {
    console.log('Server running at: ', server.info.uri);
  });
}

module.exports = server;

