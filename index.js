'use strict';

var http = require('http');
var url = require('url');
var querystring = require('querystring');
var except = require('except');
var DamsonServer = require('damson-server-core');
var damsonServer = new DamsonServer();

// Default port
const PORT = 8080;

// Routing
var handlers = {
  '/push': handlePush,
  '/pop': handlePop,
  '/ping': handlePing
};

function noop() {}

function handlePush(query) {
  var client = query.client;
  var task = {
    task_name: query.task,
    driver_name: query.driver,
    options: except(query, ['client', 'task', 'driver'])
  };
  damsonServer.pushTask(client, task);
}

function handlePop(query) {
  var task = damsonServer.popTask(query.client);
  return JSON.stringify(task);
}

function handlePing(query) {
  return 'pong';
}

function handleRequest(request, response) {
  var parts = url.parse(request.url);
  var query = querystring.parse(parts.query);
  var handler = handlers[parts.pathname] || noop;
  response.end(handler(query));
}

function start(port) {
  var server = http.createServer(handleRequest);
  server.listen(port || PORT);
}

DamsonServer.prototype.start = start;

module.exports = damsonServer;