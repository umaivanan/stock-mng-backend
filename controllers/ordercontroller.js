const orderModel=require('../models/orderModel')


exports.createOrder = async(req, res, next) => {
    const cartItems=req.body;
    const amount = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
    const status='pending';

    // Calculate the total amount
    const order=await orderModel.create({cartItems,amount,status});
    
    res.json({
      success: true,
      order
    });
  }
