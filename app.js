
/**
 * Module dependencies.
 */

require('coffee-script');

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// start bad

// if(process.env.VCAP_SERVICES){
//   var env = JSON.parse(process.env.VCAP_SERVICES);
//   var mongo = env['mongodb-1.8'][0]['credentials'];
// }
// else{
//   var mongo = {
//   "hostname":"localhost",
//   "port":27017,
//   "username":"",
//   "password":"",
//   "name":"",
//   "db":"db"
//   }
// }
// var generate_mongo_url = function(obj){
//   obj.hostname = (obj.hostname || 'localhost');
//   obj.port = (obj.port || 27017);
//   obj.db = (obj.db || 'test');
//   if(obj.username && obj.password){
//     return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
//   }
//   else{
//     return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
//   }
// }
// var mongourl = generate_mongo_url(mongo);

// end bad


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app.get("/test", function (request, response) {
  var SentimentClassifier = require('node-sentiment');
  var classifier = new SentimentClassifier;

  var result = classifier.classify('i hate open source');
  response.send(result);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
