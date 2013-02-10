var _    = require('underscore'),
    twit = require('twit');

exports.index = function(request, response) {

  var measureSentiment = function(text) {
    var sentiment = SentimentEngine.classify(text);

    if (sentiment.sentiment === "neutral") {
      return 0;
    }
    if (sentiment.sentiment === "positive") {
      return sentiment.probability;
    }
    return -1 * sentiment.probability;
  };

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
      return {
        twitter_id: tweet.user.id,
        name: tweet.user.name,
        screen_name: tweet.user.screen_name,
        profile_url: tweet.user.profile_image_url,
        source: 'twitter',
        tweet_id: tweet.id,
        text: tweet.text,
        created_at: tweet.created_at,
        sentiment: measureSentiment(tweet.text)
      };
    });

    return response.send(feed);
  });
};
