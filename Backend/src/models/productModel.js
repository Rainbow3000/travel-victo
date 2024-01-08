const mongoose = require('mongoose'); 

const Product  = new mongoose.Schema({
    name: { type: String, required: true},
    address:{type:String},
    desc:{
        type:{
            pet:{
                type:String
            },
            utils:{
                type:String
            },
            wifi:{
                type:String
            },
            parking:{
                type:String
            },
            room:{
                type:[String]
            },
            area:{
                type:[String]
            }
        }
    },
    image:{type:String,default:""},
    time:{
        type:String
    },
    personNumber:{
        type:Number,
        default:1
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category", 
        required:true
     }, 
     hotline:{
        type:String
     }
},{timestamps:true})


module.exports = mongoose.model('Product',Product); 