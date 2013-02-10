var _ = require('underscore');

exports.index = function(request, response) {

  var Twitter = new twit({
    consumer_key: twitterConsumerKey,
    consumer_secret: twitterConsumerSecret,
    access_token: request.user.twitter_access_token,
    access_token_secret: request.user.twitter_access_token_secret
  });

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

  Twitter.get('statuses/home_timeline', function(err, tweets) {
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
