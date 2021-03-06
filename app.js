var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('./config/main');
var index = require('./routes/index');
var users = require('./routes/users');
var mongoose =  require('mongoose');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Passport setting


// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(config.database) // if error it will throw async error
    .then(function(){ // if all is ok we will be here
        console.log("starting mongodb");
    })
    .catch(function(err){ // we will not be here...
        console.error('App starting error:', err.stack);
        process.exit(1);
  });


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
require('./config/passport')(passport);

var location = require('./routes/location')(passport);
var kloter = require('./routes/kloter')(passport);
var peserta = require('./routes/peserta')(passport);
var verified = require('./routes/verified')(passport);
var muser = require('./routes/muser')(passport);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', users);
app.use('/location', location);
app.use('/kloter', kloter);
app.use('/peserta', peserta);
app.use('/verified', verified);
app.use('/muser', muser);

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
