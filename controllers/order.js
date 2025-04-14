const Order = require('../models/order');

class OrderController {
	async createOrder(req, res) {
		try {
			const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

			if (!items || items.length === 0) {
				return res.status(400).json({ message: 'No products provided' });
			}
			if (!shippingAddress || !paymentMethod || !totalPrice) {
				return res.status(400).json({ message: 'Missing required fields' });
			}

			const newOrder = await Order.create({
				user: req.user.id,
				items,
				shippingAddress,
				paymentMethod,
				totalPrice
			});

			if (!newOrder) {
				return res.status(500).json({ message: 'Order creation failed' });
			}

			return res.status(201).json(newOrder);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Error creating order' });
		}
	}

	async getMyOrders(req, res) {
		try {
			const orders = await Order.find({ user: req.user.id }).populate('items.product');
			if (!orders) {
				return res.status(404).json({ message: 'No orders found' });
			}

			return res.status(200).json(orders);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Error fetching orders' });
		}
	}

	async deleteOrderById(req, res) {
		try {
			const order = await Order.findByIdAndDelete(req.params.id);
			if (!order) {
				return res.status(404).json({ message: 'Order not found' });
			}
			return res.status(200).json({ message: 'Order deleted successfully' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Error deleting order' });
		}
	}

	async changeOrderStatus(req, res) {
		try {
			const { status } = req.body;
			const orderId = req.params.id;

			const allowedStatuses = ['pending', 'success', 'failed', 'shipped', 'delivered'];
			if (!allowedStatuses.includes(status)) {
				return res.status(400).json({ message: 'Invalid status' });
			}

			const order = await Order.findById(orderId);
			if (!order) {
				return res.status(404).json({ message: 'Order not found' });
			}

			order.status = status;
			await order.save();

			return res.status(200).json({ message: 'Order status updated successfully', order });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Error changing order status' });
		}
	}
}

module.exports = new OrderController();
