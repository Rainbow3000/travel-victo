
const mongoose = require('mongoose'); 

const categorySchema = new mongoose.Schema({
   name:{type:String},
   desc:{type:String},
   image:{type:String},
   tourNumber:{type:Number,default:0}
},{timestamps:true})

module.exports = mongoose.model("Category",categorySchema); 
