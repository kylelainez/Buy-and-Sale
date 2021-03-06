const Products = require('../models/products');

module.exports = {
	home,
	showProduct
};

function home(req, res, next) {
	Products.find({}, function (err, products) {
		res.render('shop/homepage', {
			title: 'Buy and Sale',
			products,
			user: req.user
		});
	});
}

function showProduct(req, res, next) {
	console.log(req.headers.referer);
	Products.findById(req.params.id)
		.populate('seller')
		.exec(function (err, product) {
			res.render('shop/product', {
				title: product.name,
				product,
				user: req.user
			});
		});
}
