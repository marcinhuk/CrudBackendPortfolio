const { body, param } = require('express-validator')

const avatar = [
	param("email").isLength({min: 5, max: 50}).withMessage("Email must have at least 5 characters")
]

const signin = [
	body("email").isLength({min: 5, max: 50}).withMessage("Email must have at least 5 characters"),
	body("password").isLength({min: 8, max: 50}).withMessage("Password must have at least 8 characters")
]

module.exports = { avatar, signin }