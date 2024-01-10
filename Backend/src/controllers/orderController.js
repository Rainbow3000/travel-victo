
const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const Customer = require('../models/customerModel')

module.exports = {
    getOrderByUserId:async(req,res,next)=>{
        try {
            const orders = await Order.find({customer:req.params._id}).populate({
                path:'product'
            }).populate({
                path:'schedule'
            }).populate({
                path:'customer'
            }); ; 
            
            res.status(200).json({
                success:true,
                data:orders
            });  
        } catch (error) {
            res.status(500).json(error); 
        }
    }, 
    createOrder:async(req,res,next)=>{
        try {        
            const newCustomer = new Customer(req.body.customer); 
            const customer  = await newCustomer.save();     
            const newOrder = new Order(req.body.order); 
            newOrder.customer = customer.user; 
            const order  = await newOrder.save(); 
            res.status(200).json({
                success:true,
                data:{
                    order,
                    customer
                }
            }); 
        } catch (error) {
            res.status(500).json(error); 
        }
    },
    getAllOrder:async(req,res,next)=>{
        try {
            const orders = await Order.find(); 
            res.status(200).json({
                success:true,
                data:orders
            }); 
        } catch (error) {
            res.status(500).json(error); 
        }
    }, 
    updateOrder:async(req,res,next)=>{
        try {
            const order = await orderService.updateOrder({ orderId:req.params.orderId,data:req.body}); 
            res.status(200).json(order);            
        } catch (error) {
            res.status(500).json(error);
        }
    }, 
    deleteOrder:async(req,res,next)=>{
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json('delete order success !'); 
        } catch (error) {
            res.status(500).json(error); 
        }
    },
    orderCharts:async(req,res,next)=>{
        try {
            const date = new Date();
            const time = new Date(date.setMonth(date.getMonth() + 1));
            const order = await Order.aggregate([
                {
                    $match:{
                        createdAt: { $lte: time }
                    }
                },
                {
                    $project:{
                        month:{$month:"$createdAt"},
                        year:{$year:"$createdAt"},
                    }
                }, 
                {
                    $group:{
                        _id: { year: '$year', month: '$month' },
                        quantity:{$count:{}},
                    }
                },
                {
                    $sort:{_id:1}
                }
            ])

            const orders= await Order.find(); 
            const product = await Product.find(); 

            const total  = orders.reduce((x,y)=>{
                return x + y.totalMonney; 
            },0); 

            const cancel = orders.filter(item => item.status === -1); 

            res.status(200).json({
                success:true,
                data:{
                    order,
                    total,
                    cancel:cancel.length,
                    product:product.length
                }
            }); 

        } catch (error) {
            res.status(500).json(error)
        }
    },
  
    exportToExcel:async(req,res,next)=>{
        try {
            const data = await orderService.exportToExcel(req.body); 
            res.status(200).json(data); 
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
