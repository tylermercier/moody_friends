exports.feed = (req, res) ->
  console.log "Test1: #{Twitter}"
  tweets = Twitter.get 'statuses/home_timeline', (err, tweets) ->
  
    res.render 'feed',
      title: 'Twitter Feed'
      tweets: tweets