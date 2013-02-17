var _ = require('underscore');
var sentiment = require('../../lib/sentiment');

// Get average sentiment for group user tweets.
// Order by average sentiment.
// Return JSON.

function generateFeed(tweets) {
  var users = groupStatusesByUser(tweets);
  return calculateTotalSentiment(users);
};

function groupStatusesByUser(tweets) {
  var users = _.groupBy(tweets, function(tweet) {
    return tweet.user.id;
  });

  return _.map( users, function(user) {
    return {
      "twitter_id": user[0].user.id,
      "name": user[0].user.name,
      "screen_name": user[0].user.screen_name,
      "profile_url": user[0].user.profile_image_url,
      "sentiment": null,
      "source": "twitter",
      "tweets": _.map(user, function(tweet) {
        return {
          "tweet_id": tweet.id,
          "created_at": tweet.created_at,
          "profile_url": user.profile_image_url,
          "favorited": false,
          "retweeted": false,
          "sentiment": sentiment.measure(tweet.text),
          "text": tweet.text
        }
      } )
    }
  } )
}

function calculateTotalSentiment(users) {
  _.each(users, function(user) {
    sentiments = _.map(user.tweets, function(tweet) {
      return tweet.sentiment;
    });

    var total = 0;
    _.each(sentiments, function(sentiment) {
      total += sentiment;
    });

    user.sentiment = total;
  });

  return users;
}

exports.generateFeed = generateFeed;
