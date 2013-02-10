exports.measure = function(text) {
  var sentiment = SentimentEngine.classify(text);

  if (sentiment.sentiment === "neutral") {
    return 0;
  }
  if (sentiment.sentiment === "positive") {
    return sentiment.probability;
  }
  return -1 * sentiment.probability;
};
