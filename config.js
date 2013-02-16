exports = module.exports = Config;

function Config() {
}

Config.prototype.init = function(app, express, passport, mongoose) {
  app.requireAuth = true;

  this.initExpress(app, express);
  this.initPassport(app, passport);
  this.initDevelopment(app, express, mongoose);
  this.initProduction(app, express, mongoose);
};

Config.prototype.initExpress = function(app, express) {
  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.cookieParser());
    app.use(express.session({ secret: 'topsecret' }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });
};

Config.prototype.initPassport = function(app, passport) {
  app.configure(function() {
    app.use(passport.initialize());
    app.use(passport.session());
  });
};

Config.prototype.initDevelopment = function(app, express, mongoose) {
  app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    mongoose.connect('mongodb://localhost/moody_friends');
  });
};

Config.prototype.initProduction = function(app, express, mongoose) {
  app.configure('production', function() {
    app.use(express.errorHandler());
    mongoose.connect(process.env.MONGOHQ_URL);
    // error handling
    app.use(function(err, req, res, next){
      console.error(err.stack);
      res.send(500, 'Something broke!');
    });
  });
};
