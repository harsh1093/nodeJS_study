const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    sellerName: String,
    shopAddress: String,
    discount: Number,
    isAvailable: Boolean,
    qty: Number
});

const productModel = mongoose.model('productInfo', productSchema);

module.exports = productModel;