const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const UserImportedModel = require('../models/user-model');

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
	UserImportedModel.findById(id)
		.then(user => {
			done(null, user);
		})
		.catch(e => {
			done(new Error('Failed to deserialize an user'));
		});
});

passport.use(
	new GoogleStrategy(
		{
			// options for google chat
			callbackURL: keys.callbackURL,
			clientID: keys.clientID,
			clientSecret: keys.clientSecret,
		},
		function(accrss, refresh, profile, done) {
			// passport call back fired before the rest
			console.log('Passport callback function fired');
			// it will hang in here
			// console.log(profile);

			UserImportedModel.findOne({
				googleId: profile.id,
			}).then(existingUser => {
				if (existingUser) {
					// Already lodded in once
					//console.log('Existing user => ' + existingUser);
					done(null, existingUser);
				} else {
					// Create a new user in out database
					// THIS IS AN ASYNC TASK, TAKES SOME TIME => use .then()
					new UserImportedModel({
						username: profile.displayName,
						googleId: profile.id,
						avatar: profile.photos[0].value,
						email: profile.emails[0].value,
					})
						.save()
						.then(newUser => {
							//console.log('New User created ' + newUser);
							done(null, newUser);
						});
				}
			});
		},
	),
);
