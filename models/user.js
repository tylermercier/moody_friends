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
  callbackURL:    'http://127.0.0.1:3000/auth/twitter/callback'
}, function(token, tokenSecret, profile, done) {

  console.log(profile._json);
  console.log("Token:" + token);
  console.log("Token Secret:" + tokenSecret);

  process.nextTick(function() {
    model.findOne({
      twitter_handle: profile.username
    }, function(err, user) {
      if (err) {
        return done(err, false);
      }

      var new_user,
          new_attributes = {
        twitter_id: profile.id,
        name: profile.displayName,
        twitter_handle: profile.username,
        profile_img: profile._json.profile_image_url,
        twitter_access_token: token,
        twitter_access_token_secret: tokenSecret
      };

      // Create
      if (!user) {
        new_user = new model(new_attributes);
        console.log("New User instance: " + new_user);

        new_user.save(function(err, user) {
          if (err) {
            console.log("Error on Save:" + err);
            return done(err, false);
          }
          done(err, user);
        });
      }

      // Update
      user.update(new_attributes, function(err, user) {
        if (err) {
          console.log("Error on Update:" + err);
          return done(err, false);
        }
      });

      console.log("Found user: @" + user.twitter_handle);
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
