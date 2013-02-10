var ObjectId, Schema, TwitterStrategy, User, model, mongoose, name, passport, passportDeserializeUser, passportSerializeUser, schema;

User = (function() {

  function User() {}

  User.key = function() {
    return "moody_friends:" + process.env.NODE_ENV;
  };

  return User;

})();

passportSerializeUser = function(user, done) {
  return done(null, user.id);
};

passportDeserializeUser = function(id, done) {
  return model.findById(ObjectId(id), function(err, user) {
    return done(err, user);
  });
};

mongoose = require("mongoose");
passport = require("passport");

TwitterStrategy = require("passport-twitter").Strategy;

name = 'user';

Schema = mongoose.Schema;

ObjectId = mongoose.Types.ObjectId;

schema = new Schema({
  twitter_id: String,
  twitter_handle: String,
  name: String,
  email: String,
  profile_img: String,
  twitter_access_token: String,
  twitter_access_token_secret: String,
  friends: []
});

schema.virtual("displayName").get(function() {
  return this.firstName + " " + this.lastName;
});

passport.use(new TwitterStrategy({
  consumerKey:    process.env.MOODY_TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.MOODY_TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
}, function(token, tokenSecret, profile, done) {
  process.nextTick(function() {
    console.log(profile);

    model.findOne({
      twitter_handle: profile.screen_name
    }, function(err, user) {
      var new_user;
      if (err) {
        return done(err, false);
      }
      if (!user) {
        new_user = new model({
          twitter_id: profile.id_str,
          name: profile.name,
          twitter_handle: profile.screen_name,
          profile_img: profile.profile_image_url
        });
        new_user.save(function(err, user) {
          if (err) {
            return done(err, false);
          }
          done(err, user);
        });
      }
      return done(null, user);
    });
  });
}));

passport.serializeUser(passportSerializeUser);

passport.deserializeUser(passportDeserializeUser);

schema.index({
  email: 1,
  background: true
});

model = mongoose.model(name, schema);

exports.name = name;

exports.model = model;

exports.schema = schema;
