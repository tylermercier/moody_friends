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
      update = {}

      update.twitter_id = tweet.user.id
      update.name = tweet.user.name
      update.screen_name = tweet.user.screen_name
      update.profile_url = tweet.user.profile_image_url
      update.source = 'twitter'
      update.tweet_id = tweet.id
      update.text = tweet.text
      update.created_at = tweet.created_at
      update.sentiment = getSentiment(tweet.text)

      feed.push(update)

    response.send(feed);
