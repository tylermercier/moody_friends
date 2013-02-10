var app;

exports.init = function init(_app) {
  app = _app;

  var twitter = {
    scope: ['email', 'user_birthday']
  };
  
  app.get('/auth/twitter', app.passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', app.passport.authenticate('twitter', { failureRedirect: '/', successRedirect: '/' }));
};