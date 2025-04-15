const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        }
    ],
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    paymentMethod: String,
    totalPrice: Number,
    status: {
        type: String,
        enum: ['pending', 'success', 'failed', 'shipped', 'delivered'],
        default: 'pending',
    }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);