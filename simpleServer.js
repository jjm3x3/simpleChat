
const net = require('net');

var clients = [];

var server = net.createServer((socket) => {
	socket.on('data',(data) => {
		console.log(data.toString());
		console.log(clients.length -1  + " clients to send to");
		for (var i = 0; i < clients.length; ++i){
			if (clients[i] === socket) continue;
			console.log('send a message to everyone!');
			clients[i].write(data.toString());
		}
	});
	socket.on('error', (err) => {
		console.log('client err: ' + err);
	});
	clients.push(socket);
	console.log(clients.length + ' clients connected');

	socket.write('welcome to the server\n');

	numberOfOtherUsers = clients.length - 1
	if (numberOfOtherUsers === 1){
		socket.write('there is ' + numberOfOtherUsers + " other user on the server" );
	} else {
		socket.write('there are ' + numberOfOtherUsers + " other users on the server" );
	}

}).on('error', (err) => {
  // handle errors here
  throw err;
});

server.listen(9001, () => {
  address = server.address();
  console.log('opened server on %j', address);
});
