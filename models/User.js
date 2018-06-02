const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


//********** DEFINE OUR MODEL *********

const userSchema = new Schema({
    email: { 
        type: String, 
        unique: true,
        lowercase: true 
    },
    password: String
});

//********** ENCRYPTION **********
    //Use Bcrypt-nodejs to salt and hash password

//Before saving a new model, run this function
userSchema.pre('save', function(next){
    // get access to the user model with 'this'
    const user = this;

    //generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        // after a salt is created, hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            //overwrite the plain text password with the encrypted password
            user.password = hash;
            //permission to save the password
            next();
        });
    });
});

//Compare an input password to the password in the database
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
}

//********** CREATE THE MODEL CLASS **********

const ModelClass = mongoose.model('user', userSchema);



//********** EXPORT THE MODEL **********

module.exports = ModelClass;
