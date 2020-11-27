const User = require('../models/user');

module.exports = {
	newUser,
	isNewUser
};

function newUser(req, res, next) {
	User.findById(req.params.id, async function (err, user) {
		const keys = Object.keys(req.body);
		await keys.forEach((key) => {
			user[key] = req.body[key];
			console.log(user[key], key, keys[key]);
		});
		console.log('newUser', user['newUser']);
		// user.newUser = false;
		console.log('keys', keys);
		console.log(user);
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
