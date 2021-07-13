const {body , validationResult} = require('express-validator');

const signup = [
  body('name')
    .not()
    .isEmpty()
    .withMessage("Please enter your name"),
  body('firm_name')
    .not()
    .isEmpty()
    .withMessage("Please enter your firm_name"),
  body('email')
    .exists()
    .withMessage("Email already exist")
    .isEmail()
    .withMessage("Please enter the valid email-id"),
  body('password')
    .not()
    .isEmpty()
    .isLength({
      min: 6
    })
    .withMessage("Password should contain minimum 6 characters")
]

module.exports = signup
