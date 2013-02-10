var app;
var model;

exports.init = function init(app){
  app = app;
  model = app.models.user.model;
};

exports.index = function(request, response, next) {

  // TODO: Fetch User from DB and send it back
  response.render('index', {
    title: 'User list'
  });
};
