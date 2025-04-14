const express = require('express');
const router = express.Router();

const productRoutes = require('../routes/products');
const authRoutes = require('../routes/auth');
const orderRoutes = require('../routes/order');
const cartRoutes = require('../routes/cart');

const authMiddleware = require('../middleware/authMiddleware');

router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/orders', authMiddleware, orderRoutes);
router.use('/cart', authMiddleware, cartRoutes);

module.exports = router;