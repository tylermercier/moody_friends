var twit = require('twit');

exports.create = function(access_token, access_token_secret) {
  return new twit({
    consumer_key: process.env.MOODY_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.MOODY_TWITTER_CONSUMER_SECRET,
    access_token: access_token || process.env.MOODY_TWITTER_ACCESS_TOKEN,
    access_token_secret: access_token_secret || process.env.MOODY_TWITTER_ACCESS_TOKEN_SECRET
  });
};
