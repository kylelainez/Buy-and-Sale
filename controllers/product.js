const Products = require('../models/products');

module.exports = {
	home,
	showProduct
};

function home(req, res, next) {
	Products.find({}, function (err, products) {
		res.render('shop/homepage', {
			title: 'Buy and Sale',
			products
		});
	});
}

function showProduct(req, res, next) {
	Products.findById(req.params.id).then(function (err, product) {
		res.render('shop/product', {
			title: product.name,
			product
		});
	});
}
