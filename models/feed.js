var _  = require('underscore');

var sentiment = require('../lib/sentiment');

// Get average sentiment for group user tweets.
// Order by average sentiment.
// Return JSON.

function generateFeed(tweets) {

  // Only select the attributes we require:
  var tweets = cleanTweets(tweets);

  console.log(tweets);
  // var feed = _.map(tweets, function(tweet) {
  //   return new Status(tweet);
  // });
  var users = groupStatusesByUser( tweets );
  _.each( grouped_tweets)
  var userSentiments = getAverageSentiment( users );

};

function cleanTweets(tweets){
  this.twitter_id = tweet.user.id,
  this.name = tweet.user.name,
  this.screen_name = tweet.user.screen_name,
  this.profile_url = tweet.user.profile_image_url,
  this.source = 'twitter',
  this.tweet_id = tweet.id,
  this.text = tweet.text,
  this.created_at = tweet.created_at,
  this.sentiment = sentiment.measure(tweet.text)

  return this;
}

function groupStatusesByUser( tweets ) {
  return _.groupBy( tweets, function( tweet ) {
    return tweet.user.id;
  });
}

function getAverageSentiment( tweets ) {
  tweets
}

exports.generateFeed = generateFeed;