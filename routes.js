module.exports = function(app, mongoose, passport) {

  var userModel = require('./models/user')(mongoose);
  var twitterClient = require('./lib/client');

  var apiController = require('./controllers/api_controller')(app, twitterClient);
  var usersController = require('./controllers/users_controller')(app, userModel);

  app.get('/', function(request, response) {
    userModel.find({}, function(err, docs) {
      response.render('index', {
        users: docs
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
