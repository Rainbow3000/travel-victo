
const Order = require('../models/orderModel')
const xlsx = require("xlsx");
const path = require("path");
const Product = require('../models/productModel')
const Customer = require('../models/customerModel')
const {senMailOrder,senMailSuccess} = require('../utils/email')
var paypal = require('paypal-rest-sdk');
module.exports = {
    getOrderByUserId:async(req,res,next)=>{
        try {
            const customer = await Customer.findOne({userId:req.params.id})
          
         

            const orders = await Order.find({customer:customer._id}).populate({
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
            newOrder.customer = customer._id
            
            const order  = await newOrder.save(); 

            senMailOrder(newCustomer.email)

            res.status(200).json({
                success:true,
                data:{
                    order,
                    customer
                }
            }); 
        } catch (error) {
            console.log(error)
            res.status(500).json(error); 
        }
    },
    createOrderWithPaypal:async(req,res,next)=>{
        try {        
          
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:5500/api/order/paypal/success",
                    "cancel_url": "http://localhost:5500/api/order/paypal/cancel"
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "Iphone 4S",
                            "sku": "001",
                            "price": "25.00",
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": "25.00"
                    },
                    "description": "Iphone 4S cũ giá siêu rẻ"
                }]
            };
        
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href);
                        }
                    }
        
                }
            });
          
        } catch (error) {
            console.log(error)
            res.status(500).json(error); 
        }
    },


    getPaymentSuccess:async(req,res,next)=>{
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
    
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.send('Success (Mua hàng thành công)');
            }
        });
    },
    getPaymentCancel:async(req,res,next)=>{
        res.status(200).send('Cancelled (Đơn hàng đã hủy)')
    },
    getAllOrder:async(req,res,next)=>{
        try {
            const orders = await Order.find()
            .populate({
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
    updateOrder:async(req,res,next)=>{
        try {
           
            const order = await Order.findByIdAndUpdate({ _id:req.params.id},req.body,{
                news:true
            }).populate({
                path:'customer'
            })
            
            if(order.status === 1){
                senMailSuccess(order.customer.email);
            }
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
        const orders = req.body; 
        try {
            const exportExcel = (
              data,
              workSheetColumnNames,
              workSheetName,
              filePath
            ) => {
              const workBook = xlsx.utils.book_new();
              const workSheetData = [workSheetColumnNames, ...data];
              const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
              xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
              xlsx.writeFile(
                workBook,
                path.join("C:\\Users\\nguye\\Documents", filePath)
              );
            };
    
            const exportUsersToExcel = (
              orders,
              workSheetColumnNames,
              workSheetName,
              filePath
            ) => {
              const data = orders.map((order) => {
                return [
                  order.customer.name,
                  order.customer.email,
                  order.customer.phoneNumber,
                  order.product.name,
                  order.schedule.dateStart,
                  order.schedule.dateEnd,
                  order.createdAt,
                  order.totalMonney,
                  order.payType,
                  order.note,
                  order.status
                ];
              });
              exportExcel(data, workSheetColumnNames, workSheetName, filePath);
            };
    
            const workSheetColumnName = [
              "User Name",
              "Email",
              "Phone Number",
              "Tour Name",
              "From Date",
              "To Date",
              "Order Date",
              "Total Monney",
              "Pay Type",
              "Note",
              "Status"
            ];
    
            const filePath = "./fileExportToExcelWithNodejs.xlsx";
            const workSheetName = "Order";
            exportUsersToExcel(
              orders,
              workSheetColumnName,
              workSheetName,
              filePath
            );
            res.status(200).json({ message: "export to excel success !" });
          } catch (error) {
            console.log(error);
             res.status(500).json({
                success:false,
                data:null
             })
          }
    }
}
