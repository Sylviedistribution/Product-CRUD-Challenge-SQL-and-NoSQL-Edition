const product = require('../models/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const createproduct = catchAsync(async (req, res, next) => {

    const { name, price, category, inStock } = req.body;
    // 1. Create product

    const newproduct = await product.create({ name, price, price, category, inStock });
    res.status(201).json({ status: 'success', data: { product: newproduct } });

});

const getproducts = catchAsync(async (req, res, next) => {
    const products = await product.find({ owner: req.user._id });
    res.status(200).json({ status: 'success', results: products.length, data: { products } });

});

const editproduct = catchAsync(async (req, res, next) => {

    const { name, price } = req.body;

    const product = await product.findById(req.params.id);

    if (!product) {
        return next(
            new AppError("product not found", 404)
        );
    }

    if (!product.owner.equals(req.user._id)) {
        return next(
            new AppError("Not authorized", 403)
        );
    }

    product.name = name;
    product.price = price;

    await product.save();

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });

});

const deleteproduct = catchAsync(async (req, res, next) => {

    const product = await product.findById(req.params.id);
    // if (!product) return res.status(404).json({ status: 'fail', message: 'product not found' });
    if (!product) return next(
        new AppError("product not found", 404))

    // if (!product.owner.equals(req.user._id)) return res.status(403).json({ status: 'fail', message: 'Not authorized' });
    if (!product.owner.equals(req.user._id)) return next(
        new AppError("Not authorized", 403))

    await product.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });

});

module.exports = { createproduct, getproducts, editproduct, deleteproduct };