const express = require('express'); 
const router = express.Router(); 
const orderController = require('../controllers/orderController')

router.post('/api/order',orderController.createOrder); 
router.post('/api/order/exportToExcel',orderController.exportToExcel); 
router.get('/api/order',orderController.getAllOrder); 
router.get('/api/order/charts',orderController.orderCharts)
router.put('/api/order/:orderId',orderController.updateOrder);
router.delete('/api/order/:id',orderController.deleteOrder)
router.get('/api/order/byuser/:userId',orderController.getOrderByUserId);

module.exports = router; 