var FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
var fbConfig = require('../fb.js');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User')
const time = require('./../libs/timeLib');
module.exports = function (passport) {



	passport.use('facebook', new FacebookStrategy({
		clientID: fbConfig.appID,
		clientSecret: fbConfig.appSecret,
		callbackURL: fbConfig.callbackUrl,

		profileFields: ['id', 'emails', 'name']
	},

		// facebook will send back the tokens and profile
		function (access_token, refresh_token, profile, done) {

			console.log('profile', profile);

			process.nextTick(function () {

				// find the user in the database based on their facebook id
				UserModel.findOne({ 'email': profile.emails[0].value }, function (err, user) {


					if (err)
						return done(err);

					// if the user is found, then log them in
					if (user) {
						user.socialLoginFlag = true;

						user.save(function (err, user) {
							if (err) {
								throw err;
							}
							else {
								let newUserObj = user.toObject();
								return (newUserObj);
							}

						});

						console.log("user Found", user);

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


						});


						newUser.save(function (err, newUser) {
							if (err) {
								throw err;

							}
							else {
								console.log("user On saving ;;;;;;;;;;;;", newUser)
								return done(null, newUser);

							}

						});
					}

				});
			});

		}));

};