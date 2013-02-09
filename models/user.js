var mongoose = require( 'mongoose' );
var passport = require( 'passport' );
var LocalStrategy = require( 'passport-twitter' ).Strategy;
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var schema = new Schema( {
    firstName: String,
    lastName: String,
    password: String,
    email: String
  } );

/* Virtual Methods */
schema.virtual('displayName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

/* Static Methods */

/* Instance Methods */

/* Plugin Helpers */
passport.serializeUser( passportSerializeUser );
passport.deserializeUser( passportDeserializeUser );

// TODO: Replace with Twitter Strategy
// passport.use( new LocalStrategy({usernameField: 'email'}, passportLocalStrategy) );

/* Indexes */
schema.index({email: 1, background: true});

var model = mongoose.model( name, schema );

function passportSerializeUser(user, done) {
  done(null, user.id);
}

function passportDeserializeUser(id, done) {
  model.findById( ObjectId(id), function ( err, user ) {
//      user._id = user._id.toString();
    done( err, user );
  } );
}


exports.name = 'user';
exports.model = model;
exports.schema = schema;