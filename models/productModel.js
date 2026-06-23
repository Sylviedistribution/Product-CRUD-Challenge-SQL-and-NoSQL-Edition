const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        lowercase: true
    },

    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0,
        validate: {
            validator: Number.isFinite,
            message: 'Price must be a valid number'
        }
    },
    category: {
        type: String,
    },
    inStock: {
        type: Boolean,
        default: true
    },
    
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
