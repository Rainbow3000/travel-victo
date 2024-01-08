
const Customer = require('../models/customerModel');
module.exports = {
    createCustomer:async (req,res,next)=>{
        try {
            const customerModel = new Customer(req.body); 
            const customer = await customerModel.save(); 
            res.status(201).json({
                success:true,
                data:customer
            }); 
        } catch (error) {          
        }
    },
    getAllCustomer:async(req,res,next)=>{
        try {
           const customers = await Customer.find(); 
           res.status(200).json({
            success:true,
            data:customers
           }); 
        } catch (error) {
           res.status(500).json(error);  
        }
    },
    getSingleCustomer:async(req,res,next)=>{
        try {
            const customer = await Customer.findById(req.params.id); 
            res.status(200).json({
                success:true,
                data:customer
            })
        } catch (error) {
           res.status(500).json(error); 
        }
    },
    deleteCustomer:async(req,res,next)=>{
        try {
            const customerExist =  await Customer.findById(req.params.id); 
            if(!customerExist){
                res.status(404).json({
                    success:false,
                    data:null
                }); 
            }
            await Customer.findByIdAndDelete(req.params.id); 
            res.status(200).json({
                success:true,
                data:1
            }); 
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateCustomer:async(req,res,next)=>{
        try {

            const customerExist = await Customer.findById(req.params.id); 
            if(!customerExist){
                res.status(404).json({
                    success:false,
                    data:null
                }); 
            }
     
            await  Customer.findByIdAndUpdate({_id:req.params.id},req.body,{
                new:true
            }); 
            res.status(200).json({
                success:true,
                data:Customer
            }); 
        } catch (error) {
            res.status(500).json(error);
        }
    }
}