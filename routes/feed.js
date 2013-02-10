var app;

exports.init = function init(_app) {
  app = _app;
  
  app.get('/feed', app.controllers.feed.index);
};