var passport = require('passport');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
}
