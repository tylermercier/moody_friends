module.exports = function(app, userModel){
  function Controller() {}

  Controller.prototype.index = function(req, res) {
    userModel.find({}, function(err, docs){
      res.render('users/index.jade', {
        layout: 'layout.jade',
        users: docs
      });
    });
  }

  Controller.prototype.show = function(req, res){
    userModel.findById(req.params.id, function(err, doc){
      res.render('users/show.jade', {
        user: doc
      });
    });
  }

  Controller.prototype.new = function(req, res){
    res.render('users/new.jade');
  }

  Controller.prototype.create = function(req, res){
    var user = new userModel();
    user.name = req.param('doc');
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
