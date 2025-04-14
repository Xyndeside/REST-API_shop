const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.post('/', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/', cartController.updateCartItem);
router.delete('/', cartController.deleteAllItems);
router.delete('/:id', cartController.deleteItemById);

module.exports = router;