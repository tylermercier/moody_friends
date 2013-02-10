var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/moodyfriends';

app.mongoose = require('mongoose');
app._ = require('underscore');
app.passport = require('passport');
app.sentiment = require('node-sentiment');
app.twitterClient = require('./lib/client');

require('./models').init(app);

app.mongoose.connect(mongoUri);

var SentimentEngine = new app.sentiment();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.cookieParser('magic_mike'));
  app.use(express.session({ secret:'megaphone'}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.logger('dev'));

  // Setup passport
  app.use(app.passport.initialize());
  app.use(app.passport.session());

  // Pass the user to every view
  app.use(function(request, result, next){
    result.locals.user = request.user;
    next();
  });

  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, '/public')));
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

require('./controllers').init(app);
require('./routes').init(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Moody Friends server listening on port " + app.get('port'));
});
