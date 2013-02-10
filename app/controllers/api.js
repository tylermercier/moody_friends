var twit = require('twit')
, Update = require('../models/update').Update
, _  = require('underscore');

exports.index = function(request, response) {
  // TODO: Refactor this
  if (request.user){
    var token       = request.user.twitter_access_token,
        tokenSecret = request.user.twitter_access_token_secret;
  }

  var Twitter = new twit({
    consumer_key: process.env.MOODY_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.MOODY_TWITTER_CONSUMER_SECRET,
    access_token: token || process.env.MOODY_TWITTER_ACCESS_TOKEN,
    access_token_secret: tokenSecret || process.env.MOODY_TWITTER_ACCESS_TOKEN_SECRET
  })
  // END TODO: Refactor

  var tweets = Twitter.get('statuses/home_timeline', function(err, tweets) {
    var feed = _.map(tweets, function(tweet) {
      return new Update(tweet);
    });
    return response.send(feed);
  });
};
