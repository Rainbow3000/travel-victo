
const Product = require('../models/productModel');
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
            res.status(200).json({
                success:true,
                data:product
            })
        } catch (error) {
           res.status(500).json(error); 
        }
    },
    deleteProduct:async(req,res,next)=>{
        try {

            const productExist = await Product.findById(req.params.id); 
            if(!productExist){
                res.status(404).json({
                    success:false,
                    data:null
                }); 
            }
            await product.findByIdAndDelete(req.params.id); 
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
     
            const product = await  product.findByIdAndUpdate({_id:req.params.id},req.body,{
                new:true
            }); 
            res.status(200).json({
                success:true,
                data:product
            }); 
        } catch (error) {
            res.status(500).json(error);
        }
    }
}