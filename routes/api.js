var app;

exports.init = function init(app) {
  app = app;
  
  app.get('/api', app.controllers.api.index);
};