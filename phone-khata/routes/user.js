const express = require('express')
const router = express.Router()
const validationResults = require('../utils/validation')
const signup = require('../validation/user.signup.validation')
const login = require('../validation/user.login.validation')
const {controller} = require('../controller/user.controller')
const verify = require('../middleware/auth')

//Signup route
router.post('/signup' , signup , validationResults , controller.signing)

//Route to verify the otp
router.post('/verifyOTP' , controller.verify_otp)

//Login Route
router.post('/login' , login , validationResults , controller.login )

//Dashboard route
router.get('/dashboard',verify, controller.home)

//List all users
router.get('/userList', controller.userList)

//Update the user
router.put('/updateUser/:uuid' , verify , controller.update)

//Logout
router.get('/logout' , verify , controller.logout)

//Exporting the router module
module.exports = router
