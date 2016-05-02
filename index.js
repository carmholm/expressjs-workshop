var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//Exercise 1: Getting started!
// Create a web server that can listen to requests for /hello, and respond with some HTML that says <h1>Hello World!</h1>

app.get('/hello', function (req, res){
  res.send('<h1>Hello World!</h1>');
});

//

/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
