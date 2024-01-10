const mongoose = require('mongoose'); 

const Product  = new mongoose.Schema({
    name: { type: String, required: true},
    address:{type:String},
    desc:{
       type:String
    },
    image:{type:String,default:""},
    time:{
        type:String
    },
    personNumber:{
        type:Number,
        default:1
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category", 
        required:true
     }, 
     price:{
        type:Number,
        required:true,
        default:0
     },
     isSale:{
        type:Number,
        default:0
     }
},{timestamps:true})


module.exports = mongoose.model('Product',Product); 