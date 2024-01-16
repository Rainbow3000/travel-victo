const env = require('dotenv');
var paypal = require('paypal-rest-sdk');
env.config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');

const productRouter = require('./src/routers/productRouter');
const categoryRouter = require('./src/routers/categoryRouter');
const userRouter = require('./src/routers/userRouter');
const authRouter = require('./src/routers/authRouter');
const orderRouter = require('./src/routers/orderRouter');
const sheduleRouter = require('./src/routers/scheduleRouter');
const customerRouter = require('./src/routers/customerRouter'); 
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('db is connected !'))
	.catch((err) => console.log(err));

app.use(express.json());

paypal.configure({
	'mode': 'sandbox', //sandbox or live
	'client_id': process.env.Paypal_client_id,
	'client_secret': process.env.Paypal_client_secret
  });




  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/booking",
        "cancel_url": "http://localhost:3000"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};


paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
});



const PORT = process.env.PORT || 5500;

app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(authRouter);
app.use(categoryRouter);
app.use(sheduleRouter)
app.use(customerRouter); 

app.listen(PORT, () => console.log(`server is runing at http://localhost:${PORT}`));
