const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: String,
    category: { type: Number, required: true },
    inStock: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', productSchema);