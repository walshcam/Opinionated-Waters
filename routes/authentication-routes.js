const Authentication = require("./../controllers/authentication");
const passportService = require("./../services/passport");
const passport = require('passport');

//Authenticate the signin of an existing user
const requireSignin = passport.authenticate('local', { session: false });

//Post route for sending and receiving authentication
module.exports = function(app) {
    //Sign up new users
    app.post('/signup', Authentication.signup);
    //Sign in existing users
    app.post('/signin', requireSignin, Authentication.signin);
}