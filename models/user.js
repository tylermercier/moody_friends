var TwitterStrategy = require("passport-twitter").Strategy;
var Schema;
var ObjectId;
var app;
var schema;
var name;
var model;


exports.init = function init(_app){
  app = _app;
  name = 'user';

  Schema = app.mongoose.Schema;
  ObjectId = app.mongoose.Types.ObjectId;

  var twitterOptions = {
    consumerKey:    process.env.MOODY_TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.MOODY_TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
  };

  schema = new Schema({
    twitterID: String,
    twitterHandle: String,
    name: String,
    email: String,
    picture: String,
    twitterAccessToken: String,
    twitterAccessTokenSecret: String,
    friends: []
  });

  /* Indexes */

  // schema.index({
  //   email: 1,
  //   background: true
  // });

  app.passport.serializeUser(passportSerializeUser);
  app.passport.deserializeUser(passportDeserializeUser);
  app.passport.use(new TwitterStrategy(twitterOptions, passportTwitterStrategy));

  model = app.mongoose.model(name, schema);

  return this;
};

function passportSerializeUser(user, done) {
  done(null, user.id);
}

function passportDeserializeUser(id, done) {
  model.findById( ObjectId(id), function ( err, user ) {
//      user._id = user._id.toString();
    done( err, user );
  } );
}

function passportTwitterStrategy(token, tokenSecret, profile, done) {
  process.nextTick(function () {
    var now = new Date();

    if (profile.provider != 'twitter')
      return done('Invalid Provider', null);

    model.findOne({ twitterID: profile.id_str}, function(err, user) {
      if (err) return done(err, false);

      if (user) {
        console.log(now + " - User " + user._id + " logged in");
        return done(null, user);
      }

      var user = new model();
      user.twitterID = profile.id_str;
      user.name = profile.displayName;
      user.twitterHandle = profile.username;
      user.picture = profile.profile_image_url;

      user.save(function(err, user){
        if (err) return done(err, null);
        console.log(now + " - User " + user._id + " created");
        return done(null, user);
      });
    });
  });
}

exports.name = name;
exports.model = model;
exports.schema = schema;
