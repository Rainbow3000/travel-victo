const User = require('../models/userModel')

module.exports = {
    getAllUser :async(req,res,next)=>{
        try {
            const users = await User.find(); 
            res.status(200).json(users); 
        } catch (error) {
            res.status(500).json(error);
        }
    }, 
    getSingleUser:async(req,res,next)=>{
        try {
            const user = await User.findById(req.params.id); 
            res.status(200).json(user); 
        } catch (error) {
            res.status(500).json(error); 
        }
    },
    updateUser:async(req,res,next)=>{
        try {
            await User.findByIdAndUpdate({userId:req.params.id,data:req.body}); 
            res.status(200).json('update user success !');
        } catch (error) {
            console.log(error);
            res.status(500).json(error); 
        }
    }, 
    deleteUser:async(req,res,next)=>{
        try {
            await User.findByIdAndDelete(req.params.id); 
            res.status(200).json('delete user success !');
        } catch (error) {
            res.status(500).json(error); 
        }
    }, 
    userCharts:async(req,res,next)=>{
        try {
        
            res.status(200).json(); 
        } catch (error) {
            res.status(500).json(error); 
        }
    }
}


