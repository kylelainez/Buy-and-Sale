const User = require('../models/user');
const Product = require('../models/products');
const products = require('../models/products');
const e = require('express');

module.exports = {
	newUser,
	isNewUser,
	getUser,
	newPost,
	addPost,
	addCart,
	showCart,
	removeCart,
	checkout,
	editProduct,
	edit
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
				return res.render('user/showCurrent', {
					user,
					title: user.firstName + ' ' + user.lastName
				});
			});
	} else {
		User.findById(req.params.id)
			.populate('products')
			.exec(function (err, user) {
				if (user === null || user === undefined) return next(err);
				return res.render('user/show', {
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
	User.findById(req.params.id, function (err, user) {
		const product = new Product(req.body);
		product.image = req.files.image;
		product.seller = user._id;
		product.save(function (err) {
			user.products.push(product._id);
			user.save(function (err) {
				res.redirect(`/user/${user._id}`);
			});
		});
	});
}

function addCart(req, res, next) {
	User.findById(req.params.id, function (err, user) {
		const idx = user.cart.products.indexOf(req.params.product);
		if (idx === -1) {
			user.cart.products.push(req.params.product);
			user.save(function (err) {
				req.user = user;
				res.redirect(req.headers.referer);
			});
		} else res.redirect(req.headers.referer);
	});
}

function showCart(req, res, next) {
	User.findById(req.params.id, function (err, user) {
		Product.find()
			.where('_id')
			.in(user.cart.products)
			.exec(function (err, cart) {
				res.render('user/cart', { title: 'Cart', cart, user });
			});
	});
}

function removeCart(req, res, next) {
	User.findById(req.params.id, function (err, user) {
		const index = user.cart.products.indexOf(req.params.products);
		user.cart.products.splice(index, 1);

		user.save(function (err) {
			res.redirect(req.headers.referer);
		});
	});
}

function checkout(req, res, next) {
	const quantity = [...req.body.quantity];
	User.findById(req.params.id, function (err, user) {
		user.cart.products.forEach((product, idx) => {
			Product.findById(product, function (err, prod) {
				prod.quantity -= quantity[idx];

				prod.save(function (err) {});
			});
		});
		user.cart.products = [];
		user.save(function (err) {
			return res.redirect('/');
		});
	});
}

function editProduct(req, res, next) {
	console.log(req.params, 'here');
	Product.findById(req.params.product, function (err, product) {
		if (`${req.user._id}` === `${product.seller}`)
			return res.render('user/editProduct', {
				title: 'Edit Product',
				product
			});
		else return res.redirect('/');
	});
}

function edit(req, res, next) {
	Product.findById(req.params.product, function (err, product) {
		console.log(req.files, 'files');
		product.name = req.body.name;
		product.price = req.body.price;
		product.quantity = req.body.quantity;
		product.information = req.body.information;
		product.image = req.files.image;
		product.save(function (err) {
			res.redirect('/');
		});
	});
}
