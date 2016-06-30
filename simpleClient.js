// const net = require('net');

// const client = net.connect({port: 9001});
// console.log("connected to server");
// client.write("a thing to you");


const net = require('net');
const readline = require('readline');

const client = net.connect({port: 9001, host: process.argv[2]}, () => {
  // 'connect' listener
  console.log('connected to server!');
  client.write('clientConnected!');
});
client.on('data', (data) => {
  // console.log(rl);
  console.log(data.toString());
  // client.write('message Recived\n');
  // client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});


const rl = readline.createInterface({
	input: process.stdin,
	outpu: process.stdout
});

rl.setPrompt('OHHI> ');
rl.prompt();

rl.on('line', (line) => {
	client.write(line);
	rl.prompt();
});
