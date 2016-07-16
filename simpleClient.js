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
  var message = stringToNumber(line);

  p = 2053
  q = 7919
  n = p*q
  t = (p-1) * (q -1);

  e = makeAnE(n);
  console.log("here is an e:" + e);

  gcd = euclidAlg(t,e);
  console.log("gcd of " + t + " and " + e + ": " + gcd);
  while (gcd != 1){
    e = e / gcd;
    gcd = euclidAlg(t,e);
    console.log("gcd of " + t + " and " + e + ": " + gcd);
    if (e <= n.toString(2).lenght){
      e = makeAnE(n);
    }
  }


  // set e = relativly prime number to t
  // invoves doing prime factorization
  e = 17  // this makes our d wrong because is in tearms of 17
  // figue out a way to come up with d
  d = 10513241

  c = binSqr(e,n,message);
  console.log("here is the cryptic message: " + c);
  unc = binSqr(d,n,c);

  numberToString(unc);

	client.write(c.toString());
	rl.prompt();
});

function makeAnE(n){
  var leng = n.toString(2).length
  console.log(leng)
  return Math.floor(Math.random() * (n - leng) + leng);
}

function stringToNumber(message){
  var decmalString = "";
  for(i = 0; i< message.length; ++i ){
    decmalString += message.charCodeAt(i).toString(16);
  }
  var result = parseInt("0x" + decmalString);
  console.log(result); 
}

function numberToString(unc){
  console.log("uncryptoed message: " + unc);
  hexString = unc.toString(16);
  finalMessage = "";
  for ( i = 0; i < hexString.length; i += 2){
    finalMessage += String.fromCharCode(parseInt("0x" + hexString.charAt(i) + hexString.charAt(i+1)));
    // console.log("finalMessage sofar: " + finalMessage);
  }
  // console.log(finalMessage);
  return finalMessage;
}

function euclidAlg(t,n){

  // var q = [];
  // var r = [];

  // r1 = t % n;
  // r.push(r1);
  // q1 = (t - r1)/n;
  // q.push(q1);

  // t = n;
  // n = r1;




  var i;
  var x = 0;
  for ( i = 0 ; x <= t; ++i) {
    x = n * (1+i);
  }
  multiple = n * (i-1);
  newMultiple = t - multiple
  // console.log(t + " = " + (i-1) + " * " + n + " + " + newMultiple);

  if (newMultiple === 0) return n;
  else
    return euclidAlg(n,newMultiple);


}

// raises m^e nod n
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

    // console.log("here is k: " + k);
    result = result * k;
    result = result % n;

    debugger;
    // console.log("s: " + s);
    // console.log("e: " + e);

  }
  return result;
}


