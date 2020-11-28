var express = require('express');
var router = express.Router();
const user = require('../controllers/user');

router.get('/:id', isLoggedIn, user.getUser);
router.get('/new-user/:id', isLoggedIn, user.isNewUser);

router.put('/new-user/:id', user.newUser);

//Check if Logged In
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	else res.redirect('/auth/google');
}

module.exports = router;
