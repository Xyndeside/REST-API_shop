const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('/search', productController.searchProducts);
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

module.exports = router;
