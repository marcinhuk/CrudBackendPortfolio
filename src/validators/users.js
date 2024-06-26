const { body, param } = require('express-validator')

const postOne = [
	body("email").isLength({min: 5, max: 150}).withMessage("Email must have at least 5 characters"),
	body("full_name").isLength({min: 5, max: 150}).withMessage("Full name must have at least 5 characters"),
	body("password").isLength({min: 8, max: 50}).withMessage("Password must have at least 8 characters")
]

const putOne = [
	body("email").isLength({min: 5, max: 150}).withMessage("Email must have at least 5 characters"),
	body("full_name").isLength({min: 5, max: 150}).withMessage("Full name must have at least 5 characters"),
	body("password").isLength({min: 8, max: 50}).withMessage("Password must have at least 8 characters")
]

const patchActive = [
	param("id").isNumeric().withMessage("ID must be numeric"),
	body("active").isInt({min: 0, max: 1}).withMessage("Active must be between 0 and 1")
]

const patchAdmin= [
	param("id").isNumeric().withMessage("ID must be numeric"),
	body("admin").isInt({min: 0, max: 1}).withMessage("Active must be between 0 and 1")
]

const deleteOne = [
	param("id").isNumeric().withMessage("ID must be numeric")
]

module.exports = { postOne, putOne, patchActive, patchAdmin, deleteOne }