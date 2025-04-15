const Wishlist = require('../models/wishlist');
const Product = require('../models/product');

class WishlistController {
	async getWishlist(req, res) {
		try {
			const userId = req.user.id;

			const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
			if (!wishlist) {
				return res.status(404).json({ message: 'Wishlist not found' });
			}

			res.status(200).json(wishlist);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Error fetching wishlist' });
		}
	}

	async addToWishlist(req, res) {
		try {
			const userId = req.user.id;
			const productId = req.params.productId;

			let wishlist = await Wishlist.findOne({ user: userId });
			if (!wishlist) {
				wishlist = new Wishlist({ user: userId, products: [] });
			}

			const product = await Product.findById(productId);
			if (!product) {
				return res.status(404).json({ message: 'Product not found' });
			}

			const alreadyInWishlist = wishlist.products.some((item) =>
				item.product.toString() === productId
			);
			if (!alreadyInWishlist) {
				wishlist.products.push({ product: productId });
			}

			await wishlist.populate('products.product');
			await wishlist.save();

			res.status(200).json(wishlist);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Error adding to wishlist' });
		}
	}

	async removeFromWishlist(req, res) {
		try {
			const userId = req.user.id;
			const productId = req.params.productId;

			const wishlist = await Wishlist.findOne({ user: userId });
			if (!wishlist) {
				return res.status(404).json({ message: 'Wishlist not found' });
			}

			const product = await Product.findById(productId);
			if (!product) {
				return res.status(404).json({ message: 'Product not found' });
			}

			wishlist.products = wishlist.products.filter((item) => item.product.toString() !== productId);
			await wishlist.save();

			res.status(200).json(wishlist);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Error removing from wishlist' });
		}
	}

	async clearWishlist(req, res) {
		try {
			const userId = req.user.id;

			const wishlist = await Wishlist.findOne({ user: userId });
			if (!wishlist) {
				return res.status(404).json({ message: 'Wishlist not found' });
			}

			wishlist.products = [];
			await wishlist.save();

			res.status(200).json({ message: 'Wishlist cleared successfully' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Error deleting wishlist' });
		}
	}
}

module.exports = new WishlistController();
