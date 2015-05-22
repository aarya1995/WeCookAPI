// Required modules for functional api
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Lists all routes required by api
var routes = require('./routes/index');
var users = require('./routes/users');
var menu = require('./routes/menu');
// Mongoose is a node module for MongoDB commands
var mongoose = require('mongoose');
// Connect to specified database, log result in console
mongoose.connect('mongodb://test:test@ds031812.mongolab.com:31812/api/', function(err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});
// Sets application up to use the express framework
var app = express();

/*
  MEGA IMPORTANT SOLVES 340 ERROR 
  WHEN TRYING TO CONNECT
  ESSENTIALLY A BROWSER CACHE ISSUE, 
  SOLVED WITH THIS FOLLOWING LINE
*/
app.disable('etag');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* 
  MEGA IMPORTANT, REMOVES This
  CORS RESTRICTIONS ON
  THE SPECIFIED WEBSITE, 
  AND SETS ANY PERMISSIONS
  NECESSARY FOR THAT SITE
*/

app.use(function (req, res, next) { 
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// SPECIFY ALL ROUTES THAT SHOULD BE FUNCTIONING
app.use('/', routes);
app.use('/users', users);
app.use('/menu', menu);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
