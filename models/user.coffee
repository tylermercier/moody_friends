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
LocalStrategy = require("passport-twitter").Strategy
Schema = mongoose.Schema
ObjectId = mongoose.Types.ObjectId
schema = new Schema(
  firstName: String
  lastName: String
  password: String
  email: String
)
schema.virtual("displayName").get ->
  @firstName + " " + @lastName

passport.serializeUser passportSerializeUser
passport.deserializeUser passportDeserializeUser
schema.index
  email: 1
  background: true

model = mongoose.model(name, schema)
exports.name = "user"
exports.model = model
exports.schema = schema