var port = process.env.PORT || 14638;
var host = process.env.HOST || 'localhost'

console.log("SocketIO server starting on " + host + ":" + port);

var io = require('socket.io')(port);
var ElizaBot = require('./elizabot.js');

console.log("Starting Eliza");
ElizaBot.start();

io.on('connection', function(socket) {
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
	
	console.log("Client connected");
});
