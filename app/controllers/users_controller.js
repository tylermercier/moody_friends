var Models = require('../models/');

module.exports = {
  index: function(req, res) {
    Models.user.find({}, function(err, users){
      res.render('users/index.jade', {
        users: users
      });
    });
  },
  show: function(req, res){
    Models.user.findById(req.params.id, function(err, user){
      res.render('users/show.jade', {
        user: user
      });
    });
  },
  new: function(req, res){
    res.render('users/new.jade');
  },
  create: function(req, res){
    var user = new Models.user();
    user.name = req.param('name');
    user.date = new Date();
    user.save(function(error) {
      if (error) {
        console.log('error saving Models.user: ' + error);
        return res.render('users/new', { errors: error.errors, user: user });
      }
      return res.redirect('/users');
    });
  }
};
