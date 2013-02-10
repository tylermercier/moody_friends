var app;
var generateFeed = require('../models/feed').generateFeed

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

exports.feed = function(request, response) {
  console.log(request.body);

  // app._.each(request.body.authString.split('&'), function(param){
  //   var key   = param.split('=')[0],
  //       value = param.split('=')[1];
  //   params[key] = value;
  // });

  var accessToken       = request.body.oauth_token || "",
      accessTokenSecret = request.body.oauth_token_secret || "";

  console.log("token " + accessToken);
  console.log("secret" + accessTokenSecret);

  var client = app.twitterClient.create(accessToken, accessTokenSecret);
  var feedJSON = client.get('statuses/home_timeline', { count: 200 }, function(err, tweets) {
    return response.send( new generateFeed( tweets ) );
  });

};
