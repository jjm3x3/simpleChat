
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
	clients.push(socket);
	console.log(clients.length + ' clients connected');

	socket.write('welcome to the server');
}).on('error', (err) => {
  // handle errors here
  throw err;
});

server.listen(9001, () => {
  address = server.address();
  console.log('opened server on %j', address);
});
