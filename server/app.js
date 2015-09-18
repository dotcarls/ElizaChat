var port = process.env.PORT || 1337;
var host = process.env.HOST || 'localhost'

var io = require('socket.io')(port);


io.on('connection', function(socket) {
	socket.emit("connected");
	socket.emit("chat message", "You are now connected to " + host + ".\nThere are currently " + io.engine.clientsCount + " connections.");

	socket.on("welcome", function(name) {
		console.log("Welcoming: " + name);
		io.emit("chat message", "Eliza: Welcome " + name + "!");
	});
	
	socket.on("chat message", function(message, name) {
		io.emit("chat message", name +": " +message);
	});
	
	console.log("Client connected");
});
