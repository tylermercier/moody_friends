var express = require('express')
  , http = require('http')
  , routes = require('./app/routes')
  , config = require('./app/config')
  , userModel = require('./app/models/user.js')
  , mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/moodyfriends'
  , mongoose = require('mongoose')
  , nodeSentiment = require('node-sentiment');

mongoose.connect(mongoUri);
SentimentEngine = new nodeSentiment();

var app = express();
config.load(app);
routes.load(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
