var express = require('express');
var app = require('../app');
var bodyParser = require("body-parser");
var router = express.Router();
var db= app.get('db');
var users = db.get('users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  users.count({}, function (error, count) {
   if (err) {
        console.log(err);
        res.send('Errore collection users:'+err);
      }else{
      res.send(count+" Users registred");
      }
  });
});
router.post('/login', function (req, res) {
  console.log(req.body);
  var rUsername = req.body.username;
  var rPassword = req.body.password;
  users.find({'username': rUsername}).toArray(function (err, result) {
      if (err) {
        console.log(err);
        res.send('Errore di login:'+err);
      } else if (result.length) {
        if(result.length === 1){
          if(result.password === rPassword){
            res.send('User:'+rUsername+' Loged in');
            console.log('Login User:'+rUsername);
          }else{
            res.send('Password errata per '+rUsername);
          }
        }else{
          var emsg = 'Error: Duplicate user '+rUsername;
          console.log(emsg);
          res.send(emsg);
        }
      } else {
         res.send('No User:'+rUsername+' found');
      }
  });
  
});
router.put('/user', function (req, res) {
  console.log(req.body);

  // Submit to the DB
  users.insert({
      "username" : req.body.username,
      "password" : req.body.password,
      "regDate" : new Date()
  }, function (err, doc) {
    console.log(err);
  });
  res.send('Got a registration request');
});
router.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
module.exports = router;
