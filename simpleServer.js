// const net = require('net');

// server = net.createServer();
// server.listen({port: 9001}, () => {
// 	console.log('someone Connected');
// });
// console.log(server.address());

// while(true) {
// };

const net = require('net');
var server = net.createServer((socket) => {
	socket.on('data',(data) => {
		console.log(data.toString());
	});

	socket.write('welcome to the server');
}).on('error', (err) => {
  // handle errors here
  throw err;
});

server.listen(9001, () => {
  address = server.address();
  console.log('opened server on %j', address);
});
