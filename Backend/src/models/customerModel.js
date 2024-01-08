const mongoose = require('mongoose'); 

const customerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true}, 
    phoneNumber:{type:String,required:true,minlength:10}, 
    address:{type:String,required:true},
    note:{type:String},
    status:{type:Number,default:1}
},{timestamps:true})



module.exports = mongoose.model('customer',customerSchema); 
