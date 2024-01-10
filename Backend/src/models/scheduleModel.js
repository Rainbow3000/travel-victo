const mongoose = require('mongoose');
const ScheduleSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    hotline:{
        type:String
    },
    dateStart:{
        type:String
    },
    dateEnd:{
        type:String
    },
  
    status:{type:Number,require:true,default:0}
}, { timestamps: true })


module.exports = mongoose.model('Schedule', ScheduleSchema); 