const mongoose = require('mongoose');
const Order = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Schedule'
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    },
    totalMonney:{type:Number,required:true},
    payType:{
        type:String
    },
   
    status:{type:Number,require:true,default:0}
}, { timestamps: true })


module.exports = mongoose.model('Order', Order); 