var app;

exports.init = function init(_app){
  app = _app;

  return this;
};

var Update = require('../models/update').Update;

exports.index = function(request, response, next) {
  var client = app.twitterClient.create(request);
  var tweets = client.get('statuses/home_timeline', function(err, tweets) {
    if (err) return next(err);

    var feed = app._.map(tweets, function(tweet) {
      return new Update(tweet);
    });
    
    return response.send(feed);
  });
};
