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
  console.log(line);
  var decmalString = "";
  for(i = 0; i< line.length; ++i ){
    decmalString += line.charCodeAt(i).toString(16);
  }
  var message = parseInt("0x" + decmalString);
  console.log(message);

  p = 2053
  q = 7919
  n = p*q
  t = (p-1) * (q -1);
  // set e = relativly prime number to t
  // invoves doing prime factorization
  e = 17  // this makes our d wrong is in tearms of 17
  // figue out a way to come up with d
  d = 10513241

  c = binSqr(e,n,message);
  console.log("here is the cryptic message: " + c);
  console.log("uncryptoed message: " + binSqr(d,n,c));
  var cryptoMessage = message ^ e;

	client.write(cryptoMessage.toString());
	rl.prompt();
});

function binSqr(e,n,m){
   var result = m; // might not always be mod n
   while(e>1){    
    k = m;
    s = e.toString(2);
    // console.log("s.length: " + s.length);
   
    for(i = s.length; i>1; i--){
      k = Math.pow(k,2);
      k = k%n;
    }
    someNum = Math.pow(2, (s.length-1));
    // console.log("removed portion: " + someNum);
    e = e-someNum;

    console.log("here is k: " + k);
    result = result * k;
    result = result % n;

    debugger;
    // console.log("s: " + s);
    // console.log("e: " + e);

  }
  return result;
}


