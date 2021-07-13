const {body} = require('express-validator')

const customerInfo = [
    body('name')
        .exists()
        .not()
        .isEmpty()
        .isLength({
            min:3
        })
        .withMessage("Please enter customer name and should consist of minimum 3 characters"),
    body('phone_number')
        .not()
        .isEmpty()
        .isLength({
            max:10
        })
        .withMessage("Please enter your Phone Number"),
    body('description')
        .exists()
        .not()
        .isEmpty()
        .withMessage("Please enter the Description")
]

module.exports = customerInfo