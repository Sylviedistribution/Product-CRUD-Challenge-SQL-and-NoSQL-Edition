const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createProduct = catchAsync(async (req, res, next) => {
  const { name, price, category, inStock } = req.body;
  const newProduct = await Product.create({ name, price, category, inStock });
  res.status(201).json({ status: 'success', data: { product: newProduct } });
});

const getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ status: 'success', results: products.length, data: { products } });
});

const getProductById = catchAsync(async (req, res, next) => {
  const products = await Product.findById(req.params.id);
  res.status(200).json({ status: 'success', results: products.length, data: { products } });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { name, price, category, inStock } = req.body;

  const productDoc = await Product.findById(req.params.id);
  if (!productDoc) return next(new AppError('product not found', 404));

  if (name !== undefined) productDoc.name = name;
  if (price !== undefined) productDoc.price = price;
  if (category !== undefined) productDoc.category = category;
  if (inStock !== undefined) productDoc.inStock = inStock;

  await productDoc.save();

  res.status(200).json({ status: 'success', data: { product: productDoc } });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const productDoc = await Product.findById(req.params.id);
  if (!productDoc) return next(new AppError('product not found', 404));

  await Product.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: 'success', data: null });
});

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };