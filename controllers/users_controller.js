module.exports = function(app, userModel){
  function Controller() {}

  Controller.prototype.index = function(req, res) {
    userModel.find({}, function(err, users){
      res.render('users/index.jade', {
        users: users
      });
    });
  }

  Controller.prototype.show = function(req, res){
    userModel.findById(req.params.id, function(err, user){
      res.render('users/show.jade', {
        user: user
      });
    });
  }

  Controller.prototype.new = function(req, res){
    res.render('users/new.jade');
  }

  Controller.prototype.create = function(req, res){
    var user = new userModel();
    user.name = req.param('name');
    user.date = new Date();
    user.save(function(error) {
      if (error) {
        console.log('error saving userModel: ' + error);
      }
    });
    res.redirect('/users');
  }

  return new Controller();
};
