
/**
 * Module dependencies.
 */
 
require('coffee-script');

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , feed = require('./routes/feed')
  , http = require('http')
  , path = require('path')
  , twit = require('twit')
  , konphyg = require('konphyg')('./config');
  
config = konphyg.all();

Twitter = new twit({
    consumer_key:         config.twitter.consumer_key
  , consumer_secret:      config.twitter.consumer_secret
  , access_token:         config.twitter.access_token
  , access_token_secret:  config.twitter.access_token_secret
})

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/feed', feed.feed);

app.get("/test", function (request, response) {
  var SentimentClassifier = require('node-sentiment');
  var classifier = new SentimentClassifier;

  var result = classifier.classify('i hate open source');
  response.send(result);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
