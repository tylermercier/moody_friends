var app;

exports.init = function init(app){
  app = app;
};

exports.index = function(request, response, next) {
  var client = app.twitterClient.create(request);
  var tweets = client.get('statuses/home_timeline', function(err, tweets) {
    if (err) return next(err);

    response.render('feed', {
      title: 'Twitter Feed',
      tweets: tweets
    });
  });
};
