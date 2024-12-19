// const express = require('express');
// const { getProducts, getProductByBarcode } = require('../controllers/productcontroller');
// const router = express.Router();

// // Correcting the routes to align with the base path '/api/v1/products'
// router.route('/').get(getProducts); // Matches /api/v1/products
// router.route('/barcode/:barcodeId').get(getProductByBarcode); // Matches /api/v1/products/barcode/:barcodeId


// module.exports = router;

const express = require('express');
const { getProducts, getProductByBarcode, addProduct, sellProduct } = require('../controllers/productcontroller');
const router = express.Router();

router.route('/').get(getProducts).post(addProduct);
router.route('/barcode/:barcodeId').get(getProductByBarcode);
router.route('/:productId/sell').patch(sellProduct);

module.exports = router;