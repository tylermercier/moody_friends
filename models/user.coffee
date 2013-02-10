class User
  @key: ->
    "moody_friends:#{process.env.NODE_ENV}"

# TODO: Replace with Twitter Strategy
# passport.use( new LocalStrategy({usernameField: 'email'}, passportLocalStrategy) );

# Indexes
passportSerializeUser = (user, done) ->
  done null, user.id
passportDeserializeUser = (id, done) ->
  model.findById ObjectId(id), (err, user) ->

    #  user._id = user._id.toString();
    done err, user

mongoose = require("mongoose")
passport = require("passport")
TwitterStrategy = require("passport-twitter").Strategy
name = 'user'

Schema = mongoose.Schema
ObjectId = mongoose.Types.ObjectId
schema = new Schema(
  screenName: String
  firstName: String
  lastName: String
  password: String
  email: String
  friends: []
)
schema.virtual("displayName").get ->
  @firstName + " " + @lastName

passport.use new TwitterStrategy
  consumerKey: process.env.MOODY_TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.MOODY_TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
  # callbackURL: 'http://moodyfriends.heroku.com/auth/twitter/callback'
  ,
  (token, tokenSecret, profile, done) ->
    process.nextTick ->
      console.log(profile)
      model.findOne
        'email': profile.email,
        (err, user) ->
          return done(err, false) if err
          unless user
            model.save profile,
              (err, user) ->
                return done(err, false) if err
                return done(err, user)
          done(null, user)

passport.serializeUser passportSerializeUser
passport.deserializeUser passportDeserializeUser
schema.index
  email: 1
  background: true

model = mongoose.model(name, schema)
exports.name = name
exports.model = model
exports.schema = schema