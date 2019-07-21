var FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
var fbConfig = require('../fb.js');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User')
const time = require('./../libs/timeLib');
module.exports = function(passport) {

	

    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.appID,
        clientSecret    : fbConfig.appSecret,
		callbackURL     : fbConfig.callbackUrl,
		//passReqToCallback : true,
		profileFields: ['id', 'emails', 'name']
    },

    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {
       // console.log('access token is --->',access_token)
		console.log('profile', profile);
		//console.log('----------------------------',done,"--------------------------");
		// console.log("req is+++++++++++++++++++++++++",req)
		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their facebook id
	        UserModel.findOne({ 'email' : profile.emails[0].value }, function(err, user) {

	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            if (err)
	                return done(err);

				// if the user is found, then log them in
	            if (user) {
					user.socialLoginFlag = true;
					//user.sociallyCreatedOn = time.now();

					user.save(function(err,user) {
	                    if (err){
							throw err;
						}
						else{
							let newUserObj = user.toObject();
                        	return(newUserObj);
						}
	                        

						// if successful, return the new user
						// console.log("user saved'''''''",user)
	                    // return done(null, user);
	                });

					console.log("user Found",user);
					
					
					//user.sociallyCreatedOn = time.now();
	                return done(null, user); // user found, return that user
	            } else {
	                // if there is no user found with that facebook id, create them
	                var newUser = new UserModel({
						userId: profile.id,
						userName: profile.emails[0].value,
						email: profile.emails[0].value,
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
						socialLoginFlag: true,
						//sociallyCreatedOn: time.now(),

					});

					// set all of the facebook information in our user model
	               // newUser.fb.id    = profile.id; // set the users facebook id	                
					// newUser.userId = profile.id; // we will save the token that facebook provides to the user	   
					// newUser.userName = profile.emails[0].value;
					// newUser.email = profile.emails[0].value;          
	                // newUser.firstName  = profile.name.givenName;
	                // newUser.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
	                // newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
					// newUser.socialLoginToken =true;
					// newUser.sociallyCreatedOn = time.now();
					// save our user to the database
	                newUser.save(function(err,newUser) {
	                    if (err){
							throw err;

						}
						else{
							console.log("user On saving ;;;;;;;;;;;;",newUser)
	                    	return done(null, newUser);

						}
	                        

						// if successful, return the new user
						
	                });
	            }

	        });
        });

    }));

};