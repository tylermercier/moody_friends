exports.feed = (request, response) ->
  tweets = Twitter.get 'statuses/home_timeline', (err, tweets) ->
    response.render 'feed',
      title: 'Twitter Feed'
      tweets: tweets
