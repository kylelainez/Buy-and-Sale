const { deserializeUser } = require('passport');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user');

// configuring Passport!
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK
		},
		function (accessToken, refreshToken, profile, cb) {
			// a user has logged in via OAuth!
			User.findOne({ googleId: profile.id }, function (err, user) {
				if (err) return cb(err);
				//Checks if user is existing in the database
				if (user) {
					return cb(null, user);
				} else {
					// if user does not exist
					// Create a new User
					const newUser = new User({
						googleId: profile.id,
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
						avatar: profile.photos[0].value,
						email: profile.emails[0].value
					});

					newUser.save(function (err) {
						if (err) return cb(err);
						return cb(null, newUser);
					});
				}
			});
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	// Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
	console.log(id, 'deserializeUser');
	User.findById(id, function (err, user) {
		done(err, user);
	});
});
