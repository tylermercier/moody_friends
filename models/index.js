var app;

exports.init = function init(_app) {
  app = _app;
  app.models = app.models || {};

  app.models.user = require('./user').init(app);
};