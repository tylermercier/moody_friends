var twitterClient = require('../functions/client')
, Update = require('../models/update').Update
, _  = require('underscore');

exports.index = function(request, response) {
  var client = twitterClient.create(request);
  var tweets = client.get('statuses/home_timeline', function(err, tweets) {
    var feed = _.map(tweets, function(tweet) {
      return new Update(tweet);
    });
    return response.send(feed);
  });
};
