const Authentication = require("./../controllers/authentication");
const passportService = require("./../services/passport");
const passport = require('passport');
const replyController = require("../controllers/reply");

//Impliment Passport Middleware
//session is false so that no cookies are created
const requireAuth = passport.authenticate('jwt', { session: false });

//Post route for sending and receiving authentication
module.exports = function(app) {
    //require authentication before ('/') get request with requireAuth
    app.get('/feature', requireAuth, replyController.find);
    app.post('/feature/:id', requireAuth, replyController.create);
    app.delete('/feature/:id', requireAuth, replyController.delete);
}