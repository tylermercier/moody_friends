var sentiment = require('../lib/sentiment');

exports = module.exports = Update;

function Update(tweet) {
  this.twitter_id = tweet.user.id,
  this.name = tweet.user.name,
  this.screen_name = tweet.user.screen_name,
  this.profile_url = tweet.user.profile_image_url,
  this.source = 'twitter',
  this.tweet_id = tweet.id,
  this.text = tweet.text,
  this.created_at = tweet.created_at,
  this.sentiment = sentiment.measure(tweet.text)
};
