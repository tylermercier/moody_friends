var app;

exports.init = function init(app) {
  app = app;
  app.models = app.models || {};

  app.models.user = require('./user').init(app);
};