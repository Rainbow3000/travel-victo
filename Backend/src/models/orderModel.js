const mongoose = require('mongoose');
const Order = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    totalMonney:{type:Number,required:true},
    phone:{type:Number,required:true}, 
    address:{type:String,required:true},
    methodPay:{type:String,default:"paypal",required:true},
    isPaid:{type:Boolean,default:false,required:true},
    paidAt:{type:String},
    isDelivered:{type:Boolean,require:true,default:false}, 
    orderDate:{type:String,require:true},
    email:{type:String,required:true},
    deliveredAt: {
        type: String,
    },
    status:{type:String,require:true,default:"Pending"}
}, { timestamps: true })


module.exports = mongoose.model('Order', Order); 