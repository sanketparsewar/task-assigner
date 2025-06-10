const express=require('express')
const { createCustomer, getAllCustomers } = require('../controllers/customer.controller')
const router=express.Router()

router.post('/',createCustomer)
router.get('/',getAllCustomers)

module.exports=router