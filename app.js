var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var FileStreamRotator = require('file-stream-rotator')
var fs = require('fs')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var passport = require('passport')  
var session = require('express-session')  
var RedisStore = require('connect-redis')(session)

var app = module.exports = express();
var db = monk('localhost:27017/shoppinglist');
app.set('db',db);
app.use(session({  
  store: new RedisStore({
    url: 'localhost:6379'
  }),
  secret: 'il segreto della pietra azzurra',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())  
app.use(passport.session()) 

var index = require('./routes/index');
var users = require('./routes/users');



var logDirectory = path.join(__dirname, 'log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a write stream (in append mode) for log
var logStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'shoppinglist-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev',{stream:logStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
