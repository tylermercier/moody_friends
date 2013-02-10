_ = require('underscore')

exports.index = (request, response) ->
  getSentiment = (text) ->
    sentiment = SentimentEngine.classify(text)
    if sentiment.sentiment == "neutral"
      return 0
    else
      multiplier = 1
      multiplier = -1 unless sentiment.sentiment == "positive"
      return multiplier * sentiment.probability

  tweets = Twitter.get 'statuses/home_timeline', (err, tweets) ->
    feed = []
    _.each tweets, (tweet) ->
      update =
        twitter_id: tweet.user.id
        name: tweet.user.name
        screen_name: tweet.user.screen_name
        profile_url: tweet.user.profile_image_url
        source: 'twitter'
        tweet_id: tweet.id
        text: tweet.text
        created_at: tweet.created_at
        sentiment: getSentiment(tweet.text)

      feed.push(update)

    response.send(feed);
