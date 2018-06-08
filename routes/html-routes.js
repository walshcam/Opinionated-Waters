const Authentication = require("./../controllers/authentication");
const passportService = require("./../services/passport");
const passport = require('passport');

//Impliment Passport Middleware
//session is false so that no cookies are created
const requireAuth = passport.authenticate('jwt', { session: false });

//Post route for sending and receiving authentication
module.exports = function(app) {
    //require authentication before ('/') get request with requireAuth
    // Define any API routes before this runs
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}