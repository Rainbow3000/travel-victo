const express = require('express')
const router = express.Router();

const customerController = require("../controllers/customerController");

router.post("/api/customer", customerController.createCustomer);
router.get("/api/customer/:id", customerController.getSingleCustomer);
router.put("/api/customer/:id", customerController.updateCustomer);
router.get("/api/customer", customerController.getAllCustomer);
router.delete("/api/customer/:id", customerController.deleteCustomer);

module.exports = router;