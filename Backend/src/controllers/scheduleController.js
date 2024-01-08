const Schedule = require('../models/scheduleModel');
module.exports = {
    createSchedule:async (req,res,next)=>{
        try {
            const scheduleModel = new Schedule(req.body); 
            const schedule = await scheduleModel.save(); 
            res.status(201).json({
                success:true,
                data:schedule
            }); 
        } catch (error) {          
        }
    },
    getAllSchedule:async(req,res,next)=>{
        try {
           const schedules = await Schedule.find(); 
           res.status(200).json({
            success:true,
            data:schedules
           }); 
        } catch (error) {
           res.status(500).json(error);  
        }
    },
    getSingleSchedule:async(req,res,next)=>{
        try {
            const schedule = await Schedule.findById(req.params.id); 
            res.status(200).json({
                success:true,
                data:schedule
            })
        } catch (error) {
           res.status(500).json(error); 
        }
    },
    deleteSchedule:async(req,res,next)=>{
        try {

            const scheduleExist = await Schedule.findById(req.params.id); 
            if(!scheduleExist){
                res.status(404).json({
                    success:false,
                    data:null
                }); 
            }
            await Schedule.findByIdAndDelete(req.params.id); 
            res.status(200).json({
                success:true,
                data:1
            }); 
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateSchedule:async(req,res,next)=>{
        try {

            const scheduleExist = await Schedule.findById(req.params.id); 
            if(!scheduleExist){
                res.status(404).json({
                    success:false,
                    data:null
                }); 
            }
     
            const schedule = await  Schedule.findByIdAndUpdate({_id:req.params.id},req.body,{
                new:true
            }); 
            res.status(200).json({
                success:true,
                data:schedule
            }); 
        } catch (error) {
            res.status(500).json(error);
        }
    }
}