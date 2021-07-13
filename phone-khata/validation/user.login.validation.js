const {body , validationResult} = require('express-validator');

const login = [
  body('email')
    .exists()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Email is not valid'),
  body('password')
    .exists()
    .not()
    .isEmpty()
    .isLength({
        min:6
    })
    .withMessage('Password should be minimum 6 characters')
]

module.exports = login