// Check the configuration file for more details
var config = require('./config');

// Express.js stuff
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);

// Websockets with socket.io
var io = require('socket.io')(server);

console.log("Trying to start server with config:", config.serverip + ":" + config.serverport);

// Both port and ip are needed for the OpenShift, otherwise it tries 
// to bind server on IP 0.0.0.0 (or something) and fails
server.listen(config.serverport, config.serverip, function() {
  console.log("Server running @ http://" + config.serverip + ":" + config.serverport);
});

// Allow some files to be server over HTTP
app.use(express.static(__dirname + '/'));

// Serve GET on http://domain/
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Server GET on http://domain/api/config
// A hack to provide client the system config
app.get('/api/config', function(req, res) {
  res.send('var config = ' + JSON.stringify(config));
});

// And finally some websocket stuff
io.on('connection', function (socket) { // Incoming connections from clients
  // Greet the newcomer
  socket.emit('hello', { greeting: 'Hi socket ' + socket.id + ' this is Server speaking! Let\'s play ping-pong. You pass!' });

  socket.on('ping', function (data) { // ping-event from the client to be respond with pong
    console.log("received ping from client: ", data);
    socket.emit('pong', { id: data.id });
  });
});
