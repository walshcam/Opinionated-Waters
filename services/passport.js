const passport = require('passport');
const User = require('../models/User');
const config = process.env.SECRET_KEY || require('../config/config').SECRET_KEY;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//=======================================================================

//Create Local Strategy to sign in with email/password

//=======================================================================

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    //Verify this email and password, call done with the user
    //if it is the correct email and password
    //otherwise, call done with false

    //Find email in database
    User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        // is there no email that matches in the database?
        if (!user) { return done(null, false); }

        // compare passwords - is 'password' equal to user.password? (Encrypt 'password' to compare it to user.password)
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            // if the password does not match
            if (!isMatch) { return done(null, false); }

            // if the password matches the username
            return done(null, user);
        });
    });
});

//=======================================================================

//Setup options for JWT Strategy

//=======================================================================

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config
};

//Create JWT strategy
//      payload => decoded JWT Token
//      done    => callback after successfully authenticating user
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with the other
    // otherwise, call done without a user object
    User.findById(payload.sub, function(err, user){
        //if no user was authenticated
        if (err) { return done(err, false); }

        //If they were authenticated, return error as null and return the user
        if (user) {
            done(null, user);
        //If the authentication was correct, but no user was found...
        } else {
            done(null, false);
        }
    });
});

//=======================================================================

//Using The Strategies

//=======================================================================

    //Create new user strategy
passport.use(jwtLogin);
    //Login an existing user strategy
passport.use(localLogin);