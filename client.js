// Use the Singleton pattern
// to make sure that only one Client object exists
var Client;

(function () {
  var instance;
  Client = function Client() {
    if (instance) {
      return instance;
    }

    // Set the instance variable and return it onwards
    instance = this;

    // Connect websocket to Server
    this.connect();
    console.log("Client started");
  };
}());

Client.prototype.connect = function() {
  var connString = config.protocol + config.domain + ':' + config.clientport;

  console.log("Websocket connection string:", connString, config.wsclientopts);

  var self = this;

  this.socket = io.connect(connString, config.wsclientopts);

  // Handle error event
  this.socket.on('error', function (err) {  
    console.log("Websocket 'error' event:", err);
  });

  // Handle connection event
  this.socket.on('connect', function () { 
    console.log("Websocket 'connected' event with params:", self.socket);
    document.getElementById('top').innerHTML = "Connected.";
  });

  // Handle disconnect event
  this.socket.on('disconnect', function () {
    console.log("Websocket 'disconnect' event");
    document.getElementById('top').innerHTML = "Disconnected.";
  });

// OWN EVENTS GO HERE...

  // Listen for server hello event
  this.socket.on('hello', function (data) {
    console.log("Server says:", data.greeting);

    // Start heartbeat timer
    self.heartbeat(self); 
  });

  // pong to our ping
  this.socket.on('pong', function (data) {
    if(data.id == self.pingtime) {
      document.getElementById('ping').innerHTML = Date.now() - self.pingtime + " ms";
    }
    else {
      console.log("pong failed:", data.id, self.pingtime);
    }
  });

};

// Keep pinging and ponging with server
Client.prototype.heartbeat = function (self) {

  // Create heartbeat timer,
  // the third param 'self' is not supported in IE9 and earlier 
  var tmo = setTimeout(self.heartbeat, config.heartbeattmo, self); 

  self.pingtime = Date.now();
  self.socket.emit('ping', {id: self.pingtime});
};
