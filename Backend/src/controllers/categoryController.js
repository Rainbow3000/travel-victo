
const Category = require('../models/categoryModel');
module.exports = {
    createCategory:async (req,res,next)=>{
        try {
            const categoryModel = new Category(req.body); 
            const category = await categoryModel.save(); 
            res.status(201).json({
                success:true,
                data:category
            }); 
        } catch (error) {          
        }
    },
    getAllCategory:async(req,res,next)=>{
        try {
           const categorys = await Category.find(); 
           res.status(200).json({
            success:true,
            data:categorys
           }); 
        } catch (error) {
           res.status(500).json(error);  
        }
    },
    getSingleCategory:async(req,res,next)=>{
        try {
            const category = await Category.findById(req.params.id); 
            res.status(200).json({
                success:true,
                data:category
            })
        } catch (error) {
           res.status(500).json(error); 
        }
    },
    deleteCategory:async(req,res,next)=>{
        try {

            const categoryExist = await Category.findById(req.params.id); 
            if(!categoryExist){
                res.status(404).json({
                    success:false,
                    data:null
                }); 
            }
            await Category.findByIdAndDelete(req.params.id); 
            res.status(200).json({
                success:true,
                data:1
            }); 
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateCategory:async(req,res,next)=>{
        try {

            const categoryExist = await Category.findById(req.params.id); 
            if(!categoryExist){
                res.status(404).json({
                    success:false,
                    data:null
                }); 
            }
     
            const category = await  Category.findByIdAndUpdate({_id:req.params.id},req.body,{
                new:true
            }); 
            res.status(200).json({
                success:true,
                data:category
            }); 
        } catch (error) {
            res.status(500).json(error);
        }
    }
}