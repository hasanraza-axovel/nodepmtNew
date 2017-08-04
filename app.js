var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var io = require('socket.io')();
var apis = require('./routes/apis');

var app = express();

app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var sockets = [];
io.on('connection', function(socket){
  var handshakeData = socket.request;
  sockets[handshakeData._query['username']] = socket.id;

  socket.on('join-group', function(data) {
    io.emit('refresh-online-users', Object.keys(sockets));
  });

  socket.on('chat message', function(msg){
  io.emit('chat message', msg);

  socket.on('disconnect', function() {
    var index = sockets.indexOf(socket.id);
    sockets.splice(index, 1);
    io.emit('refresh-online-users', Object.keys(sockets));

  });
});
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("access-control-allow-methods", "GET, POST, PUT");
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/apis', apis);


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

module.exports = app;
