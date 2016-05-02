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

function sayHello (name){
  return "<h1>Hello " + name +" !</h1>";
}

app.get('/hello/:name', function(req, res){
  var name = req.params.name;
  var result = sayHello(name);
  res.send(result);
});



/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
