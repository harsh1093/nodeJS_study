"use strict";

var express = require('express');

var app = express();

var path = require('path');

app.use('/static', express["static"](path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.send('Server is running');
});
app.get('/greet', function (req, res) {
  console.log(req.query);
  res.send("Hello! " + req.query.name);
});
app.get('/greet/:name', function (req, res) {
  // console.log(req.params);
  var name = req.params.name;
  res.render('index.ejs', {
    name: name,
    age: 30,
    color: 'green'
  });
});
app.get('*', function (req, res) {
  // res.send('Error');
  res.redirect('/');
});
app.listen(3000, function () {
  console.log('Server listening on port 3000');
});