var express = require('express')
  , mongoose = require('mongoose');

module.exports = function(app) {
  app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    mongoose.connect('mongodb://localhost/moody_friends');
  });

  app.configure('production', function() {
    app.use(express.errorHandler());
    mongoose.connect(process.env.MONGOHQ_URL);
    // error handling
    app.use(function(err, req, res, next){
      console.error(err.stack);
      res.send(500, 'Something broke!');
    });
  });
}
