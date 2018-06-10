const Authentication = require("./../controllers/authentication");
const passportService = require("./../services/passport");
const passport = require('passport');
const commentsController = require("./../controllers/comments");

//Impliment Passport Middleware
//session is false so that no cookies are created
const requireAuth = passport.authenticate('jwt', { session: false });

//Post route for sending and receiving authentication
module.exports = function(app) {
    //require authentication before ('/') get request with requireAuth
    app.get('/feature/:id', requireAuth, commentsController.find);
    app.post('/feature/:id', requireAuth, commentsController.create);
    app.delete('/feature/:id', requireAuth, commentsController.delete);
}