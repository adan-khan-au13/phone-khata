const express = require('express')
const router = express.Router()
const {controller} = require('../controller/customer.controller')
const customerInfo = require('../validation/customerInfo.validation')
const validationResults = require('../utils/validation')
const userAuth = require('../middleware/auth')

//Add customer route
router.post('/addCustomer', userAuth , customerInfo, validationResults , controller.create)

//Find a customer on the basis of customer ID
router.get('/findOne/:customer_id' , userAuth ,controller.findaCustomer)

//Find all customers
router.get('/find' , userAuth ,controller.findCustomer)

//Find the customer on the basis of name
router.get('/find/:name' , userAuth , controller.findCustomerOnTheBasisOfName)

//Update info of the customer
router.put('/updateInfo/:customer_id' , userAuth , customerInfo  , controller.editCustomer) 

//Delete the info of the customer on the basis of name
router.delete('/deleteInfo/:customer_id' , userAuth , controller.deleteCustomer )

//Get customers who have debit balance
router.get('/debit' , userAuth,  controller.getDebitBalance)

//Get customers who have credit balance
router.get('/credit' , userAuth , controller.getCreditBalance)

//Exporting the router module
module.exports = router