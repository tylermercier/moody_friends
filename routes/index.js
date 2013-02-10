var app;

exports.init = function init(_app) {
  app = _app;
  
  // Main home route
  app.get('/', function(request, response, next){
    response.render('index', {
      title: 'Moody Friends'
    });
  });

  require('./auth').init(app);
  require('./user').init(app);
  require('./api').init(app);
  require('./feed').init(app);
};
