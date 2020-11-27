var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
	if (req.user)
		if (req.user.newUser)
			return res.redirect(`/user/new-user/${req.user._id}`);
	res.render('index', { title: 'Buy and Sale', user: req.user });
});

// Google OAuth login route
router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
router.get(
	'/oauth2callback',
	passport.authenticate('google', {
		successRedirect: '/', // where do you want the client to go after you login
		failureRedirect: '/' // where do you want the client to go if login fails
	})
);

// OAuth logout route
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

//Check if Logged In
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	else res.redirect('/auth/google');
}
module.exports = router;
