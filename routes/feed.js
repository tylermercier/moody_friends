var app;

exports.init = function init(app) {
  app = app;
  
  app.get('/feed', app.controllers.feed.index);
};