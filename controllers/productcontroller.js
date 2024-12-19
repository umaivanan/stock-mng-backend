const productModel = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
  const products = await productModel.find({});

  res.json({
    success: true,
    products,
  });
};

exports.getProductByBarcode = async (req, res, next) => {
  try {
    const { barcodeId } = req.params;

    const product = await productModel.findOne({ barcodeId });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const { name, barcodeId, stock } = req.body;

    const product = await productModel.create({
      name,
      barcodeId,
      stock,
      stockOut: stock <= 0,
    });

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product',
    });
  }
};

exports.sellProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Product is out of stock',
      });
    }

    product.stock -= 1;
    product.stockOut = product.stock <= 0;
    await product.save();

    res.json({
      success: true,
      message: 'Product sold successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to sell product',
    });
  }
};
