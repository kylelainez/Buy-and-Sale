const User = require('../models/user');

module.exports = {
	newUser,
	isNewUser,
	getUser
};

function newUser(req, res, next) {
	User.findById(req.params.id, function (err, user) {
		const keys = Object.keys(req.body);
		keys.forEach((key) => {
			user[key] = req.body[key];
		});
		user.newUser = false;
		user.save(function (err) {
			res.redirect('/');
		});
	});
}

function isNewUser(req, res, next) {
	if (req.user.newUser) {
		return res.render('user/newUserForm', {
			title: 'New User Form',
			id: req.params.id
		});
	}
	res.redirect('/');
}

function getUser(req, res, next) {
	const isCurrentUser = `${req.user._id}` === req.params.id ? true : false;
	if (isCurrentUser) {
		res.render('user/showCurrent', {
			user: req.user,
			title: req.user.firstName + ' ' + req.user.lastName
		});
	} else {
		User.findById(req.params.id, function (err, user) {
			res.render('user/show', {
				user,
				title: user.firstName + ' ' + user.lastName
			});
		});
	}
}
