var mongoose = require('mongoose');

var collection = 'users';
var schema = new mongoose.Schema({
  author: mongoose.Schema.ObjectId,
  name: String,
  date: Date
});

module.exports = mongoose.model(collection, schema);
