var io = require('socket.io')(14638);

var userCount = 0;

io.on('connection', function(socket) {
	userCount++;
	socket.on("welcome", function(name) {
		console.log("Welcoming: " + name);
		io.emit("chat message", "Eliza: Welcome " + name + "!");
	});

	socket.on("something else", function() {
		console.log("Got something else");
	});

	socket.emit("connected");
	socket.emit("chat message", "You are now connected to silo. There are currently " + io.engine.clientsCount + " connections.");
	
	socket.on("disconnect", function() { userCount--; });
	
	socket.on("chat message", function(message, name) {
		io.emit("chat message", name +": " +message);
	});
	
	console.log("Client connected");
});

io.on('disconnect', function() {
	userCount--;
});
