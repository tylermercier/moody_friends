var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();

require('./config')(app, express, mongoose, passport);
require('./routes')(app, mongoose, passport);

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function(){
  console.log('server started');
});
