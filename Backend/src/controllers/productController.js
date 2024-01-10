
const Product = require('../models/productModel');
const Schedule = require('../models/scheduleModel');
module.exports = {
    createProduct:async (req,res,next)=>{
        try {
            const productModel = new Product(req.body); 
            const product = await productModel.save(); 
            res.status(201).json({
                success:true,
                data:product
            }); 
        } catch (error) {       
            res.status(500).json({
                success:false,
                data:error
            });   
        }
    },
    getAllProduct:async(req,res,next)=>{
        try {
           const products = await Product.find(); 
           res.status(200).json({
            success:true,
            data:products
           }); 
        } catch (error) {
           res.status(500).json(error);  
        }
    },

    getByCategory:async(req,res,next)=>{
        try {
            const product = await Product.find({categoryId:req.params.id}); 
            res.status(200).json({
                success:true,
                data:product
            })
        } catch (error) {
           res.status(500).json(error); 
        }
    },
    getSingleProduct:async(req,res,next)=>{
        try {
            const product = await Product.findById(req.params.id); 
            if(!product){
                res.status(404).json({
                    success:false,
                    data:null
                }); 
            }
            const schedule = await Schedule.find({product:product._id});  
            product._doc.schedules = schedule; 
            res.status(200).json({
                success:true,
                data:product,
                
            })
        } catch (error) {
           res.status(500).json(error); 
        }
    },
    deleteProduct:async(req,res,next)=>{
        try {
            console.log(req.params.id)
            const productExist = await Product.findById(req.params.id); 
            if(!productExist){
                res.status(404).json({
                    success:false,
                    data:null
                }); 
            }
            await Product.findByIdAndDelete(req.params.id); 
            res.status(200).json({
                success:true,
                data:1
            }); 
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateProduct:async(req,res,next)=>{
        try {

            const productExist = await Product.findById(req.params.id); 
            if(!productExist){
                res.status(404).json({
                    success:false,
                    data:null
                }); 
            }
     
            const product = await  Product.findByIdAndUpdate({_id:req.params.id},req.body,{
                new:true
            }); 
            
            res.status(200).json({
                success:true,
                data:product
            }); 
        } catch (error) {
            console.log(error); 
            res.status(500).json(error);
        }
    }
}