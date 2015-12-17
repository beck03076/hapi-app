'use strict';

module.exports = (function() {

  var env = process.env.NODE_ENV || 'development';

  var databaseConfig = function() {
    return {
      'production': {
        'protocol': process.env.EPIONE_DB_PROTOCOL,
        'host': process.env.EPIONE_DB_HOST,
        'user': process.env.EPIONE_DB_USER,
        'password': process.env.EPIONE_DB_PASS,
        'port': process.env.EPIONE_DB_PORT
      },
      'development': {
        'protocol': process.env.EPIONE_DEVELOPMENT_DB_PROTOCOL,
        'host': process.env.EPIONE_DEVELOPMENT_DB_HOST,
        'user': process.env.EPIONE_DEVELOPMENT_DB_USER,
        'password': process.env.EPIONE_DEVELOPMENT_DB_PASS,
        'port': process.env.EPIONE_DEVELOPMENT_DB_PORT
      },
      'test': {
        'protocol': process.env.EPIONE_TEST_DB_PROTOCOL,
        'host': process.env.EPIONE_TEST_DB_HOST,
        'user': process.env.EPIONE_TEST_DB_USER,
        'password': process.env.EPIONE_TEST_DB_PASS,
        'port': process.env.EPIONE_TEST_DB_PORT
      }

    };
  };

  var applicationConfig = function() {
    return {
      'production': {
        'url': 'http://' + process.env.EPIONE_NODE_HOST + ':' + process.env.EPIONE_NODE_PORT,
        'host': process.env.EPIONE_NODE_HOST,
        'port': process.env.EPIONE_NODE_PORT
      },
      'development': {
        'url': 'http://' + process.env.EPIONE_DEVELOPMENT_NODE_HOST + ':' + process.env.EPIONE_DEVELOPMENT_NODE_PORT,
        'host': process.env.EPIONE_DEVELOPMENT_NODE_HOST,
        'port': process.env.EPIONE_DEVELOPMENT_NODE_PORT
      },
      'test': {
        'url': 'http://' + process.env.EPIONE_TEST_NODE_HOST + ':' + process.env.EPIONE_TEST_NODE_PORT,
        'host': process.env.EPIONE_TEST_NODE_HOST,
        'port': process.env.EPIONE_TEST_NODE_PORT
      }
    };
  };

  var dbConstants = databaseConfig();
  var appConstants = applicationConfig();

  var obj = {
    application: {
      url: appConstants[env].url,
      host: appConstants[env].host,
      port: appConstants[env].port
    },
    database: {
      host: dbConstants[env].host,
      user: dbConstants[env].user,
      password: dbConstants[env].password,
      port: dbConstants[env].port,
      commitUrl: dbConstants[env].protocol + '://' + dbConstants[env].user + ':' + dbConstants[env].password + '@' +
      dbConstants[env].host + ':' + dbConstants[env].port +
        '/db/data/transaction/commit'
    },
    server: {
      defaultHost: 'http://localhost:8001'
    }
  };

  if (!obj.application.host) {
    throw new Error('Missing constant application.host. Check your environment variables.');
  } else if (!obj.application.port) {
    throw new Error('Missing constant application.port. Check your environment variables.');
  } else if (!obj.database.host) {
    throw new Error('Missing constant database.host. Check your environment variables.');
  } else if (!obj.database.port) {
    throw new Error('Missing constant database.port. Check your environment variables.');
  } else if (!obj.database.user) {
    throw new Error('Missing constant database.user. Check your environment variables.');
  } else if (!obj.database.password) {
    throw new Error('Missing constant database.password. Check your environment variables.');
  }

  return obj;
}());

