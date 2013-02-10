var app;

exports.init = function init(_app) {
  app = _app;
  
  // app.get('/users', app.middleware.ensureAuthenticated, app.controllers.user.index);
  app.get('/users', app.controllers.user.index);
};