var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();

var Config = require('./config');
var configuration = new Config();
configuration.init(app, express, passport, mongoose);

require('./routes')(app, mongoose, passport);

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function(){
  console.log('server started');
});
