var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'carmholm',
  password: '',
  database: 'reddit'
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

//Exercise 1: Getting started!
// Create a web server that can listen to requests for /hello, and respond with some HTML that says <h1>Hello World!</h1>

app.get('/hello', function (req, res){
  res.send('<h1>Hello World!</h1>');
});

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

function getRedditPosts(callback) {
  connection.query(`SELECT p.title, p.url, p.createdAt, p.updatedAt, p.subredditId, u.username 
      FROM posts p 
      JOIN users u 
      ON p.userId=u.Id 
      WHERE userId=1
      ORDER BY p.createdAt 
      LIMIT 5`,
    function(err, res) {
      if (err) {
        callback(err);
      }
      else {
        callback(null, res);
      }
    });
}

app.get('/posts', function(req, res) {
  getRedditPosts(function(err, posts) {
    if (err) {
      res.status(500).send('oops try again later!');
    }
    else {

      var allPosts = posts.map(function(post) {
        return `
          <li class="content-item">
            <h2 class="content-item__title">
              <a href=${post.url}>${post.title}</a>
            </h2>
            <p>Created by ${post.username}</p>
          </li>`});
        
        
        res.send(`
          <div id="contents">
            <h1>List of posts</h1>
              <ul class="contents-list">
                ${allPosts.join('')}
              </ul>
          </div>
      `);
    }
  });
});

app.get('/createContent', function(req, res){
  res.sendFile('form.html', { root: __dirname + '/'}, function(err, result) {
        if (err) {
          console.log(err);
          res.status(err.status).end();
        }
        else {
            console.log('File sent');
        }
    });
});

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login gets urlencoded bodies
app.post('/createContent', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  // res.send(req.body);
  var answer = req.body;
  createPost(answer, function(err, post){
    if (err) {
      console.log(err);
    }
    else {
      res.send(post);
    }
  });
});

// POST /api/users gets JSON bodies
app.post('/createContent', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  // create user in req.body
});


function createPost (post, callback) {
      connection.query(
        'INSERT INTO `posts` (`userId`, `title`, `url`, `createdAt`) VALUES (?, ?, ?, ?)', [1, post.title, post.url, null],
        function(err, result) {
          if (err) {
            callback(err);
          }
          else {
            connection.query(
              'SELECT `id`,`title`,`url`,`userId`, `createdAt`, `updatedAt` FROM `posts` WHERE `id` = ?', [result.insertId],
              function(err, result) {
                if (err) {
                  callback(err);
                }
                else {
                  callback(null, result[0]);
                }
              }
            );
          }
        }
      );
    }



/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
