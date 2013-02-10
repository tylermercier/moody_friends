var app;

exports.init = function init(app) {
  app = app;
  
  console.log(app.controllers);
  console.log(app.models);
  // app.get('/users', app.middleware.ensureAuthenticated, app.controllers.user.index);
  app.get('/users', app.controllers.user.index);
};