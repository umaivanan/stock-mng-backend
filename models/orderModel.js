const mongoose = require('mongoose');

const orderSchema=new mongoose.Schema({
    cartItems:Array,
    amount:String,
    status:String,
    createdAt:Date,
    barcodeId: String,
})

const orderModel=mongoose.model('Order',orderSchema);
module.exports=orderModel;