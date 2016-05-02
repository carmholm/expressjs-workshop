var express = require('express');
var app = express();


app.get('/', function (req, res) {
  res.send('Hello World!');
});

//Exercise 1: Getting started!
// Create a web server that can listen to requests for /hello, and respond with some HTML that says <h1>Hello World!</h1>

// app.get('/hello', function (req, res){
//   res.send('<h1>Hello World!</h1>');
// });

// Exercise 2: A wild parameter has appeared!
// Create a web server that can listen to requests for /hello?name=firstName, and respond with some HTML that says <h1>Hello _name_!</h1>. For example, if a client requests /hello/John, the server should respond with <h1>Hello John!</h1>.

// function sayHello (name){
//   return "<h1>Hello " + name +" !</h1>";
// }

// app.get('/hello/:name', function(req, res){
//   var name = req.params.name;
//   var result = sayHello(name);
//   res.send(result);
// });

function calculator (operation, num1, num2){
 var firstOp = parseInt(num1);
 var secondOp = parseInt(num2);
 if (operation === "add"){
    return {
      "operator": "add",
      "firstOperand": firstOp,
      "second Operand": secondOp,
      "solution": firstOp + secondOp
    };
  }
  else if (operation === "sub"){
    return {
      "operator": "sub",
      "firstOperand": firstOp,
      "second Operand": secondOp,
      "solution": firstOp - secondOp
    };
  }
  else if (operation === "mult"){
    return {
      "operator": "mult",
      "firstOperand": firstOp,
      "second Operand": secondOp,
      "solution": firstOp * secondOp
    };
  }
  else if (operation === "div"){
    return {
      "operator": "div",
      "firstOperand": firstOp,
      "second Operand": secondOp,
      "solution": firstOp / secondOp
    };
  }
    else {
      return "Error";
  }
}

app.get('/calculator/:operation/:num1/:num2', function(req, res){
  console.log(res.status);
  var operation = req.params.operation;
  var num1 = req.params.num1;
  var num2 = req.params.num2;
  var result = calculator(operation, num1, num2);
  result == "Error" ? res.status(400).send("Bad Request") : res.send(result);
});


/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
