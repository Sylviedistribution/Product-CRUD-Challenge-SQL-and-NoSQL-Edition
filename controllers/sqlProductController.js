const { db } = require('../config/db');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Insert one product into MySQL
exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, price, category, inStock } = req.body;
  const sql = 'INSERT INTO products (name, price, category, inStock) VALUES (?, ?, ?, ?)';

  const result = await new Promise((resolve, reject) => {
    db.query(sql, [name, price, category, inStock], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  res.status(201).json({ id: result.insertId, name, price, category, inStock });
});

// Get all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const rows = await new Promise((resolve, reject) => {
    db.query('SELECT * FROM products', (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
  res.json(rows);
});

// Get product by ID
exports.getProductById = catchAsync(async (req, res, next) => {
  const rows = await new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

  if (!rows || rows.length === 0) return next(new AppError('product not found', 404));
  res.json(rows[0]);
});

// Update product by ID
exports.updateProduct = catchAsync(async (req, res, next) => {
  const { name, price, category, inStock } = req.body;
  const sql = 'UPDATE products SET name = ?, price = ?, category = ?, inStock = ? WHERE id = ?';

  const result = await new Promise((resolve, reject) => {
    db.query(sql, [name, price, category, inStock, req.params.id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  if (result.affectedRows === 0) return next(new AppError('product not found', 404));
  res.json({ message: 'product updated successfully' });
});

// Delete product by ID
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const result = await new Promise((resolve, reject) => {
    db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  if (result.affectedRows === 0) return next(new AppError('product not found', 404));
  res.json({ message: 'product deleted successfully' });
});
