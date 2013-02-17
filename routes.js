var passport = require('passport');
var Models = require('./app/models/');
var apiController = require('./app/controllers/api_controller');
var usersController = require('./app/controllers/users_controller');

module.exports = function(app) {

  app.get('/', function(request, response) {
    Models.user.find({}, function(err, users) {
      response.render('index', {
        users: users
      });
    });
  });

  app.get('/api', apiController.index);
  app.post('/api/feed', apiController.feed);

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/', successRedirect: '/' }));

  app.get('/users', usersController.index);
  app.get('/users/new', usersController.new);
  app.post('/users', usersController.create);
  app.get('/users/:id', usersController.show);
  //app.get('/users/:id/edit', usersController.edit);
  //app.put('/users/:id', usersController.update);
  //app.delete('/users/:id', usersController.destroy);
};
