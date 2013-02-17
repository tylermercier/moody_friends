var express = require('express')
  , path = require('path');

module.exports = function(app) {
  var rootPath = path.dirname(process.mainModule.filename);

  app.set('views', rootPath + '/views');
  app.set('view engine', 'jade');

  app.use(express.cookieParser());
  app.use(express.session({ secret: 'topsecret' }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(rootPath + '/public'));
}
