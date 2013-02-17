var Update = require('../models/update');
var twitterClient = require('../lib/client');
var generateFeed = require('../models/feed').generateFeed;

module.exports = {
  index: function(request, response) {
    var client = twitterClient.create(request);
    var tweets = client.get('statuses/home_timeline', function(err, tweets) {
      var feed = _.map(tweets, function(tweet) {
        return new Update(tweet);
      });

      return response.send(feed);
    });
  },
  feed: function(request, response) {
    console.log(request.body);

    var accessToken = request.body.oauth_token || "";
    var accessTokenSecret = request.body.oauth_token_secret || "";

    console.log("token " + accessToken);
    console.log("secret" + accessTokenSecret);

    var client = twitterClient.create(accessToken, accessTokenSecret);
    var feedJSON = client.get('statuses/home_timeline', { count: 200 }, function(err, tweets) {
      return response.send(new generateFeed(tweets));
    });
  }
};
