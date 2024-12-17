const express = require('express');
const { createOrder } = require('../controllers/ordercontroller');
const router = express.Router();

// Define the route for creating an order
router.route('/order').post(createOrder);

module.exports = router;
