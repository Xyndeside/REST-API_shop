const Product = require('../models/Product');

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products' });
        }
    }

    async createProduct(req, res) {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product' });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error fetching product' });
        }
    }

    async updateProductById(req, res) {
        try {
            const product = await Product.updateOne(
                { _id: req.params.id },
                req.body
            );
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: `Error updating product` });
        }
    }

    async deleteProductById(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product' });
        }
    }

    async searchProducts(req, res) {
        try {
            const searchQuery = req.query.search;

            let filter = {};

            if (searchQuery) {
                filter = {
                    $or: [
                        { name: { $regex: searchQuery, $options: 'i' } },
                        { description: { $regex: searchQuery, $options: 'i' } },
                    ]
                };
            }

            const products = await Product.find(filter);

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }

            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error searching products' });
        }
    }
}

module.exports = new ProductController();