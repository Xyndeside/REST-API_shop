const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist');

router.get('/', wishlistController.getWishlist);
router.delete('/', wishlistController.clearWishlist);
router.post('/:productId', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);

module.exports = router;