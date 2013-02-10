var home = require('./controllers/home')
  , api = require('./controllers/api')
  , feed = require('./controllers/feed')
  , user = require('./controllers/user')
  , passport = require('passport');

exports.load = function(app) {
  app.get('/', home.index);
  app.get('/auth/twitter',
    passport.authenticate('twitter')
  );
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter',
    { successRedirect: '/', failureRedirect: '/' })
  );
  app.get('/users', user.index);
  app.get('/api', api.index);
  app.get('/feed', feed.index);
};
