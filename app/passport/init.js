var facebook = require('./facebook');
var User = require('../models/User');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User')
module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');
        console.log("user details are:",user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(err, user) {
            
            console.log('deserializing user:',user);
            
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Facebook and Twitter
    facebook(passport);
    //twitter(passport);

}
