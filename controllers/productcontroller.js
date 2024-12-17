const productModel=require('../models/productModel');



//get products API-http://localhost:8000/api/v1/products
exports.getProducts=async (req,res,next)=>{
     const products=await productModel.find({});

 
    res.json({
        success:true,
        products
    })
}




//get single product API-http://localhost:8000/api/v1/products/barcode/12345678
// Assuming you're using mongoose for MongoDB
exports.getProductByBarcode = async (req, res, next) => {
    try {
      const { barcodeId } = req.params;
  
      // Find the product by barcodeId
      const product = await productModel.findOne({ barcodeId });
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
  
      // Log the barcodeId to the console
      console.log('Product Barcode ID:', barcodeId);
  
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
  