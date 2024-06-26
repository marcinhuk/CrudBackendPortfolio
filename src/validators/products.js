const { body, param } = require('express-validator')

const postOne = [
	body("name").isLength({min: 5, max: 50}).withMessage("Name must have at least 5 characters"),
	body("price").isNumeric().withMessage("Price must be numeric")
]

const putOne = [
	param("id").isNumeric().withMessage("ID must be numeric"),
	body("name").isLength({min: 5, max: 50}).withMessage("Name must have at least 5 characters"),
	body("price").isNumeric().withMessage("Price must be numeric")
]

const deleteOne = [
	param("id").isNumeric().withMessage("ID must be numeric")
]

module.exports = { postOne, putOne, deleteOne }