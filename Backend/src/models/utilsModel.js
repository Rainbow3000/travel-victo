

const mongoose = require('mongoose'); 

const utilsSchema = new mongoose.Schema({
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
},{timestamps:true})

module.exports = mongoose.model("Utils",utilsSchema); 

