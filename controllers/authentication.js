const db = require('../models');
const jwt = require('jwt-simple');
const config = process.env.SECRET_KEY || require('../config/config').SECRET_KEY;

//Function that creates a token
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    console.log("In The tokenForUser Database")
    //sub - subject => using user id because it never changes
    //iat - issued at time => creates timestamp for token
    //jwt.encode() creates the encoded payload
    return jwt.encode({ sub: user.id, iat: timestamp }, config)
}

//======================================================================

// Signin Route

//======================================================================

exports.signin = function(req, res, next) {
    //User has already had their email and password authorized
    //User just needs to be given a token
    res.send({ token: tokenForUser(req.user) });
}

//======================================================================

// Signup Route

//======================================================================

exports.signup = function(req, res, err) {
    //********** INITIAL INPUT **********
    //Obtain email and password from post request
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    //********** INPUT VALIDATION **********
    //Must provide an email and password
    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide an email and password'});
    }

    // See if a user with a given email exists
    db.User.findOne({ email: email }, function(err, existingUser) {
        //If a user with an email does exist, return an error
        if(err) { return next(err); }

        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' })
        }

        //If a user with email does NOT exist, create and save user record
        db.User.create({
            email: email,
            password: password
        })
        .then(function(dbUser){
            //If there is a new user, this returns a token
            res.json({ token: tokenForUser(dbUser) });
        })
        .catch(function(err){
            res.json(err);
        });
    });
}