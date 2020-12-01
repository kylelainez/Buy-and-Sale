var express = require('express');
var router = express.Router();
const user = require('../controllers/user');

router.get('/:id', isLoggedIn, user.getUser);
router.get('/new-user/:id', isLoggedIn, user.isNewUser);
router.get('/:id/new-post', isLoggedIn, user.newPost);
router.get('/:id/cart', isLoggedIn, user.showCart);
router.get('/:id/product/:product/edit', isLoggedIn, user.editProduct);

router.put('/new-user/:id', isLoggedIn, user.newUser);
router.put('/:id/cart/:product', isLoggedIn, user.removeCart);
router.put('/:id/product/:product/edit', isLoggedIn, user.edit);
router.post('/:id/new-post', isLoggedIn, user.addPost);
router.post('/:id/add/:product', isLoggedIn, user.addCart);
router.post('/:id/cart/checkout', isLoggedIn, user.checkout);

router.delete('/:id/product/:product', isLoggedIn, user.delete);

//Check if Logged In
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	else res.redirect('/auth/google');
}

module.exports = router;
