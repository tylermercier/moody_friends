exports.index = (request, response) ->
  SentimentClassifier = require('node-sentiment')
  classifier = new SentimentClassifier()

  result = classifier.classify('nodejs is sorta cool')
  response.send(result);
