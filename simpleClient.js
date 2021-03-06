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
    console.log("my input: " + line);
    var parts = [];
    for(var i = 0; i < line.length/3; ++i) {
        var segment = line.slice(i*3,(i+1)*3);
        parts.push(segment);
    }
    console.log("what are the segments: ", parts);
    parts = parts.map(function(part) {
        return stringToNumber(part);
    })
    console.log("what are the segments (after encoding): ", parts);
    var message = stringToNumber(line);
    console.log("message in number form: " + message);
    p = 2053
    q = 7919
    n = p*q
    t = (p-1) * (q -1);

    console.log("here is our n: " + n);
    console.log("here is our t: " + t);
    e = getAnE(t);
    console.log("our e: " + e);
    // console.log("27 and 392 give this many:" + findInverse(27, 392));
    d = findInverse(e,t);
    console.log("our d: " + d);
    
    // e = 17  // this makes our d wrong because is in tearms of 17
    // // figue out a way to come up with d
    // d = 10513241

    start = new Date();
    var encryptedParts = []
    for(var i = 0; i < parts.length; i++) {
        encryptedParts[i] = binSqr(e,n,parts[i])
    }
    console.log("Here are the encrypted parts: ", encryptedParts)
    encryptedParts = encryptedParts.map(function(ep) {
        var padded = ep.toString();
        for(var i = ep.toString().length; i < 8; i++) {
            padded = "0" + padded
        }
        console.log("what does padded look like: ", padded);
        return padded;
    });
    var secretMessage = encryptedParts.join("");
    console.log("Here are the encrypted parts (after normaization): ", secretMessage)
    c = /*memEffMod(message,e,n)*/ binSqr(e,n,message);
    end = new Date()
    console.log("How long did that take: " + (end - start).toString() + ", start: " +  start + " , end: " + end);
    console.log("here is the cryptic message: " + c);
    var encryptedNumbers = []
    for(var i = 0; i < secretMessage.length/8; i++) {
        encryptedNumbers.push(secretMessage.slice(i*8,(i+1)*8));
    }
    console.log("here are the numstrings: ", encryptedNumbers)
    encryptedNumbers = encryptedNumbers.map(function(strNum) {
        return parseInt(strNum);
    });
    console.log("what are the parts: ", encryptedNumbers)
    var unEncryptedNums = encryptedNumbers.map(function(en) {
        return binSqr(d,n,en);
    });
    console.log("here are unencryptedNumbers: ", unEncryptedNums);
    var stringParts = unEncryptedNums.map(function(num) {
        return numberToString(num);
    });

    unc = binSqr(d,n,c);
    console.log("uncryptoed message: " + unc);

    console.log(numberToString(unc));

    console.log("Here is the real message: ", stringParts.join(""));

	client.write(c.toString());
	rl.prompt();
});

function getAnE(t){
  e = makeAnE(t);
  // console.log("here is an e:" + e);

  gcd = euclidAlg(t,e);
  // console.log("gcd of " + t + " and " + e + ": " + gcd);
  while (gcd != 1){
    e = e / gcd;
    // if (e <= n.toString(2).length){
    //   e = makeAnE(t);
    // }
    gcd = euclidAlg(t,e);
    // console.log("gcd of " + t + " and " + e + ": " + gcd);
  }
  return e;
}

function makeAnE(t){
  var leng = t.toString(2).length
  // console.log("t's length in makeAndE: " + leng)
  return Math.floor(Math.random() * (t - leng) + leng);
}

function stringToNumber(message){
  var decmalString = "";
  for(i = 0; i< message.length; ++i ){
    decmalString += message.charCodeAt(i).toString(16);
  }
  var result = parseInt("0x" + decmalString);
  // console.log("heres the result of stringToNumebr: " + result);
  return result; 
}

function numberToString(unc){
  
  hexString = unc.toString(16);
  finalMessage = "";
  for ( i = 0; i < hexString.length; i += 2){
    finalMessage += String.fromCharCode(parseInt("0x" + hexString.charAt(i) + hexString.charAt(i+1)));
    // console.log("finalMessage sofar: " + finalMessage);
  }
  // console.log(finalMessage);
  return finalMessage;
}

// a is small b is large
function findInverse(a, b){
  // console.log("startingwith a: " + a + "\nand b: " + b);
  var q = [];
  var composite = [a];
  
  p = a;
  var t = b;
  while( t != 0){
    r = t % p;
    qi = (t - r)/p;
    q.push(qi);
    // console.log(t + " = " + p + " * " + qi + " + " + r);
    t = p;
    p = r;
  }
  // console.log("Here is q: " + q);
  
  var result = -q[0]*a;

  for(i = 0; i < q.length-3; i++){
    composite.push(result);
    result = result * -q[i+1] + composite[i];
    // console.log("some intermediate val of result: " + result);
    // console.log("with composite looks like: " + composite);
  }

  result = (result/a)%b;
  if(result<0){
    result = b+result;
  }
  return result

}

// t is big n is small
function euclidAlg(t,n){
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

// rasies b^e mod m
function memEffMod(b,e,m) {
    var c = 1;
    for(var i = 0; i < e; i++) {
        c = (c*b)% m;
    }
    return c
}

