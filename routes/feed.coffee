# twit = require 'twit';

# exports.feed = (request, response) ->

#   if request.user
#     token       = request.user.twitter_access_token
#     tokenSecret = request.user.twitter_access_token_secret

#   Twitter = new twit(
#     consumer_key: process.env.MOODY_TWITTER_CONSUMER_KEY
#     consumer_secret: process.env.MOODY_TWITTER_CONSUMER_SECRET
#     access_token: token or process.env.MOODY_TWITTER_ACCESS_TOKEN
#     access_token_secret: tokenSecret or process.env.MOODY_TWITTER_ACCESS_TOKEN_SECRET
#   )

#   tweets = Twitter.get 'statuses/home_timeline', (err, tweets) ->
#     response.render 'feed',
#       title: 'Twitter Feed'
#       tweets: tweets


// var twit = require('twit');

// exports.feed = function(request, response) {

//   if (request.user){
//     var token       = request.user.twitter_access_token,
//         tokenSecret = request.user.twitter_access_token_secret;
//   }


//   var tweets = Twitter.get('statuses/home_timeline', function(err, tweets) {
//     console.log(tweets);
//     // response.render('feed', {
//     //   title: 'Twitter Feed',
//     //   tweets: tweets
//     // });
//   });

// };
