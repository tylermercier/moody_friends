var twitterClient = require('../functions/client');

exports.index = function(request, response) {
  var client = twitterClient.create(request);
  var tweets = client.get('statuses/home_timeline', function(err, tweets) {
    response.render('feed', {
      title: 'Twitter Feed',
      tweets: tweets
    });
  });

};
