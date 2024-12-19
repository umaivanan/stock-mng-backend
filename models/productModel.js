// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: String,
//   price: String,
//   description: String,
//   ratings: String,
//   images: [
//     {
//       image: String,
//     },
//   ],
//   category: String,
//   seller: String,
//   stock: String,
//   numOfReviews: String,
//   barcodeId: String, // Added field for barcode ID
//   createdAt: {
//     type: Date,
//     default: Date.now, // Automatically set to the current date
//   },
// });

// const productModel = mongoose.model('Product', productSchema);
// module.exports = productModel;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensure the product name is mandatory
  },
  barcodeId: {
    type: String,
    required: true, // Ensure the barcode ID is mandatory
  },
  stock: {
    type: Number,
    required: true, // Ensure the stock quantity is mandatory
  },
  stockOut: {
    type: Boolean,
    default: false, // Automatically set to false initially
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
