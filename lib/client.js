var twit = require('twit');

exports.create = function(request) {
  console.log(request);

  if (request.user){
    var token = request.user.twitter_access_token,
        tokenSecret = request.user.twitter_access_token_secret;
  }

  return new twit({
    consumer_key: process.env.MOODY_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.MOODY_TWITTER_CONSUMER_SECRET,
    access_token: token || process.env.MOODY_TWITTER_ACCESS_TOKEN,
    access_token_secret: tokenSecret || process.env.MOODY_TWITTER_ACCESS_TOKEN_SECRET
  });
};
