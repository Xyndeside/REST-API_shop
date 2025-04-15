const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const isAdmin = require('../middleware/isAdminMiddleware');

router.post('/', orderController.createOrder);
router.get('/', orderController.getMyOrders);
router.post('/from-cart', orderController.createOrderFromCart);
router.get('/all', isAdmin, orderController.getAllOrdersByParam);
router.delete('/:id', isAdmin, orderController.deleteOrderById);
router.put('/:id', isAdmin, orderController.changeOrderStatus);

module.exports = router;