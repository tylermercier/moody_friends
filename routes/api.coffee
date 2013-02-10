_ = require('underscore')

exports.index = (request, response) ->
  measureSentiment = (text) ->
    sentiment = SentimentEngine.classify(text)
    return 0 if sentiment.sentiment == "neutral"
    return sentiment.probability if sentiment.sentiment == "positive"
    -1 * sentiment.probability

  tweets = Twitter.get 'statuses/home_timeline', (err, tweets) ->
    feed = _.map tweets, (tweet) ->
      {
        twitter_id: tweet.user.id
        name: tweet.user.name
        screen_name: tweet.user.screen_name
        profile_url: tweet.user.profile_image_url
        source: 'twitter'
        tweet_id: tweet.id
        text: tweet.text
        created_at: tweet.created_at
        sentiment: measureSentiment(tweet.text)
      }

    response.send(feed);
