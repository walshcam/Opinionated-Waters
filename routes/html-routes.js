const Authentication = require("./../controllers/authentication");
const passportService = require("./../services/passport");
const passport = require('passport');
const path = require('path');

//Impliment Passport Middleware
//session is false so that no cookies are created
const requireAuth = passport.authenticate('jwt', { session: false });

//Post route for sending and receiving authentication
module.exports = function(app) {
    //require authentication before ('/') get request with requireAuth
    // app.get('/', requireAuth, function(req, res) {
    //     res.send({ hi: 'there' });
    // });
    // Define any API routes before this runs
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}