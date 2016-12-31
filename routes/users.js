var express = require('express');
var app = require('../app');
var bodyParser = require("body-parser");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', function (req, res) {
  res.send('Loged in???');
});
router.put('/user', function (req, res) {
  console.log(req.body);

  var db= app.get('db');
  var users = db.get('users');

  // Submit to the DB
  users.insert({
      "username" : req.body.username,
      "password" : req.body.password
  }, function (err, doc) {
    console.log(err);
  });
  res.send('Got a registration request');
});
router.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
module.exports = router;
