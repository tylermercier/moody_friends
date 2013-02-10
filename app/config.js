var express = require('express')
  , passport = require('passport')
  , http = require('http')
  , path = require('path')
  , mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/moodyfriends'
  , mongoose = require('mongoose')
  , twit = require('twit')
  , nodeSentiment = require('node-sentiment');

exports.load = function(app) {
  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.cookieParser('magic_mike'));
    app.use(express.session());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(passport.initialize());
    app.use(passport.session());

    // Pass the user to every view
    app.use(function(request, result, next){
      result.locals.user = request.user;
      next();
    });

    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '../public'));
    app.use(express.static(path.join(__dirname, '../public')));
  });

  app.configure('development', function(){
    app.use(express.logger('dev'));
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure('production', function(){
    app.use(express.logger());
    app.use(express.errorHandler());
  });
};
