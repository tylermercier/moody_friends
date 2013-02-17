var mongoose = require('mongoose');

var collection = 'users';

var schema = new mongoose.Schema({
  author: mongoose.Schema.ObjectId,
  name: { type : String, trim : true },
  created_at  : { type : Date, default : Date.now }
});

schema.path('name').validate(function(name) {
  return name.length > 0
}, 'Name cannot be blank');

module.exports = mongoose.model(collection, schema);
