exports.index = (request, response) ->
  tweets = Twitter.get 'statuses/home_timeline', (err, tweets) ->
    result = SentimentEngine.classify(tweets[1].text)
    result.text = tweets[0].text
    response.send(result);




# {
#   "following": [
#     {
#       "twitter_id": 63846421,
#       "name": "Brian Sutorius",
#       "screen_name":"bsuto",
#       "profile_url": "http:\/\/a0.twimg.com\/profile_images\/2596248603\/c7mhg7vxl601vcst6jap_normal.jpeg",
#       "sentiment": 7,
#       "source": "twitter",
#       "tweets": [
#         {
#           "tweet_id": 1231231,
#           "created_at": "Tue Feb 21 21:00:07 +0000 2012",
#           "profile_url": "http:\/\/a0.twimg.com\/profile_images\/2596248603\/c7mhg7vxl601vcst6jap_normal.jpeg",
#           "favorited": false,
#           "retweeted": false,
#           "sentiment": 1,
#           "text": "Zomg cat bombs!"
#         },
