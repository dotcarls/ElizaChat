var port = process.env.PORT || 14638;
var host = process.env.HOST || 'localhost'

console.log("SocketIO server starting on " + host + ":" + port);

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ElizaBot = require('./elizabot.js');

server.listen(port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

console.log("Starting Eliza");
ElizaBot.start();

io.on('connection', function(socket) {
	io.emit("updateCount", io.engine.clientsCount)
	socket.emit("connected");
	socket.emit("chat message", "You are now connected to " + host + ".\nThere are currently " + io.engine.clientsCount + " connections.");

	socket.on("welcome", function(name) {
		console.log("Welcoming: " + name);
		io.emit("chat message", "Eliza: Welcome " + name + "!");
	});
	
	socket.on("chat message", function(message, name) {
		var reply = ElizaBot.reply(message);

		io.emit("chat message", name +": " +message);
		io.emit("chat message", "Eliza: " + reply);

		console.log("CHATLOG: " + name + ": " + message);
		console.log("CHATLOG: Eliza: " + reply);
	});
	
	socket.on("disconnect", function() {
		io.emit("updateCount", io.engine.clientsCount);
	});

	console.log("Client connected");
});
