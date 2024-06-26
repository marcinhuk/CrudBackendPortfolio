const { body, param } = require('express-validator')

const findAll = [
	param("order_id").isNumeric().withMessage("Order ID must be numeric")
]

const postOne = [
	body("order_id").isNumeric().withMessage("Order ID must be numeric"),
	body("product_id").isNumeric().withMessage("Product ID must be numeric"),
	body("amount").isNumeric().withMessage("Product amount must be numeric")
]

const deleteOne = [
	param("id").isNumeric().withMessage("ID must be numeric")
]

module.exports = { findAll, postOne, deleteOne }