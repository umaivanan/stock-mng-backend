const express = require('express');
const { getProducts, getProductByBarcode } = require('../controllers/productcontroller');
const router = express.Router();

// Correcting the routes to align with the base path '/api/v1/products'
router.route('/').get(getProducts); // Matches /api/v1/products
router.route('/barcode/:barcodeId').get(getProductByBarcode); // Matches /api/v1/products/barcode/:barcodeId


module.exports = router;
