var app;

exports.init = function init(_app) {
  app = _app;
  
  app.get('/api', app.controllers.api.index);
  app.post('/api/feed', app.controllers.api.feed);
};