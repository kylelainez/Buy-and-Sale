const User = require('../models/user');
const Product = require('../models/products');

module.exports = {
	newUser,
	isNewUser,
	getUser,
	newPost,
	addPost
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
		User.findById(req.user._id)
			.populate('products')
			.exec(function (err, user) {
				console.log(user);
				res.render('user/showCurrent', {
					user,
					title: user.firstName + ' ' + user.lastName
				});
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

function newPost(req, res, next) {
	res.render('user/newProduct', {
		user: req.user,
		title: 'New Product'
	});
}

function addPost(req, res, next) {
	console.log(req.body);
	console.log(req.files.image);

	User.findById(req.params.id, function (err, user) {
		const product = new Product(req.body);
		product.image = req.files.image;
		product.seller = user._id;
		product.save(function (err) {
			console.log(product._id);
			user.products.push(product._id);
			user.save(function (err) {
				res.redirect(`/user/${user._id}`);
			});
		});
	});
}
