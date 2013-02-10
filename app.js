
/**
 * Module dependencies.
 */

require('coffee-script');

var express = require('express')
  , passport = require('passport')
  , routes = require('./routes')
  , api = require('./routes/api')
  , feed = require('./routes/feed')
  , user = require('./routes/user')
  , userModel = require('./models/user')
  , http = require('http')
  , path = require('path')
  , mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/license'
  , mongoose = require('mongoose')
  , twit = require('twit');

Twitter = new twit({
  consumer_key:         process.env.MOODY_TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.MOODY_TWITTER_CONSUMER_SECRET,
  access_token:         process.env.MOODY_TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.MOODY_TWITTER_ACCESS_TOKEN_SECRET
});

var app = express();

mongoose.connect(mongoUri);

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
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.logger('dev'));
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }) );
});

app.configure('production', function(){
  app.use(express.logger());
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/' }));
app.get('/users', user.list);
app.get('/api', api.index);
app.get('/feed', feed.feed);

app.get("/test", function (request, response) {
  var SentimentClassifier = require('node-sentiment');
  var classifier = new SentimentClassifier;

  var result = classifier.classify('nodejs is sorta cool');
  response.send(result);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
