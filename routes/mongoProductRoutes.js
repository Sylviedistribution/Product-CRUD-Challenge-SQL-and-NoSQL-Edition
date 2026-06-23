const express = require('express');
const router = express.Router();
const mongoProductController = require('../controllers/mongoProductController');

router
  .route('/')
  .get(mongoProductController.getProducts)
  .post(mongoProductController.createProduct);

router.route('/:id').get(mongoProductController.getProductById).put(mongoProductController.updateProduct).delete(mongoProductController.deleteProduct)

module.exports = router;