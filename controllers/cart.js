const Cart = require('../models/cart');

class CartController {
	async addToCart(req, res) {
		try {
			const { productId, quantity } = req.body;
			const userId = req.user.id;

			let cart = await Cart.findOne({ user: userId });
			if (!cart) {
				cart = new Cart({
					user: userId,
					items: [],
					totalPrice: 0,
				});
			}

			const existingItem = cart.items.find((item) => item.product.equals(productId));
			if (existingItem) {
				existingItem.quantity += quantity;
			} else {
				cart.items.push({
					product: productId,
					quantity,
				});
			}

			await cart.populate('items.product');

			cart.totalPrice = cart.items.reduce((total, item) => {
				const productPrice = item.product.price;
				return total + productPrice * item.quantity;
			}, 0);

			await cart.save();
			res.status(200).json(cart);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Server error: add to cart' });
		}
	}

	async updateCartItem(req, res) {
		try {
			const { productId, quantity } = req.body;
			const userId = req.user.id;

			const cart = await Cart.findOne({ user: userId });
			if (!cart) {
				return res.status(404).json({ message: 'Cart not found' });
			}

			const existingItem = cart.items.find((item) => item.product.equals(productId));
			if (!existingItem) {
				return res.status(404).json({ message: 'Item not found in cart' });
			} else {
				existingItem.quantity = quantity;
			}

			await cart.populate('items.product');
			cart.totalPrice = cart.items.reduce((total, item) => {
				const productPrice = item.product.price;
				return total + productPrice * item.quantity;
			}, 0);

			await cart.save();
			return res.status(200).json(cart);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Server error: update cart item' });
		}
	}

	async getCart(req, res) {
		try {
			const userId = req.user.id;

			const cart = await Cart.findOne({ user: userId }).populate('items.product');
			if (!cart) {
				return res.status(404).json({ message: 'Cart not found' });
			}

			return res.status(200).json(cart);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Server error: get cart' });
		}
	}

	async deleteItemById(req, res) {
		try {
			const itemId = req.params.id;
			const userId = req.user.id;

			const cart = await Cart.findOne({ user: userId });
			if (!cart) {
				return res.status(404).json({ message: 'Cart not found' });
			}

			const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
			if (itemIndex === -1) {
				return res.status(404).json({ message: 'Item not found in cart' });
			}

			cart.items.splice(itemIndex, 1);

			await cart.populate('items.product');
			cart.totalPrice = cart.items.reduce((total, item) => {
				const productPrice = item.product.price;
				return total + productPrice * item.quantity;
			}, 0);

			await cart.save();
			return res.status(200).json(cart);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Server error: delete item from cart' });
		}
	}

	async deleteAllItems(req, res) {
		try {
			const userId = req.user.id;

			const cart = await Cart.findOne({ user: userId });
			if (!cart) {
				return res.status(404).json({ message: 'Cart not found' });
			}

			cart.items = [];
			cart.totalPrice = 0;

			await cart.save();
			return res.status(200).json({ message: 'Cart successfully cleared' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Server error: delete all items from cart' });
		}
	}
}

module.exports = new CartController();
