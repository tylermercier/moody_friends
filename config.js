module.exports = function(app, express, mongoose, passport) {

  app.requireAuth = true;

  //generic config
  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'topsecret' }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));



    // Setup passport
    app.use(passport.initialize());
    app.use(passport.session());
  });

  //env specific config
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    mongoose.connect('mongodb://localhost/moody_friends');
  });

  app.configure('production', function(){
    app.use(express.errorHandler());
    mongoose.connect('mongodb://flame.mongohq.com:27087/moody_friends');
    // error handling
    app.use(function(err, req, res, next){
      console.error(err.stack);
      res.send(500, 'Something broke!');
    });
  });
};
