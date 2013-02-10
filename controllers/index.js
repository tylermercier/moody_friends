var app;

exports.init = function init(_app) {
  app = _app;
  app.controllers = app.controllers || {};

  // app.controllers.auth = require('./auth').init(app);
  app.controllers.user = require('./user').init(app);
  app.controllers.feed = require('./feed').init(app);
  app.controllers.api = require('./api').init(app);
};

exports.user = {};