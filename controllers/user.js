var app;
var model;

exports.init = function init(_app){
  app = _app;
  model = app.models.user.model;

  return this;
};

exports.index = function(request, response, next) {

  // TODO: Fetch User from DB and send it back
  response.render('index', {
    title: 'User list'
  });
};
