const mongoose = require('mongoose'); 

const customerSchema = new mongoose.Schema({ 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{type:String,required:true},
    email:{type:String,required:true}, 
    phoneNumber:{type:String}, 
    address:{type:String,required:true},
    note:{type:String},
    status:{type:Number,default:1}
},{timestamps:true})



module.exports = mongoose.model('Customer',customerSchema); 
