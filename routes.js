module.exports = function(app, mongoose, passport) {

  var twitterClient = require('./lib/client');

  var homeController = require('./controllers/home_controller')(app);
  var apiController = require('./controllers/api_controller')(app, twitterClient);

  app.get('/', homeController.index);
  app.get('/api', apiController.index);
  app.post('/api/feed', apiController.feed);
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/', successRedirect: '/' }));
};
