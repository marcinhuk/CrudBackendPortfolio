const { body, param } = require('express-validator')

const postOne = [
	body("user_id").isNumeric().withMessage("User ID must be numeric")
]

const patchStatus = [
	param("id").isNumeric().withMessage("ID must be numeric"),
	body("status").isNumeric().withMessage("Status must be numeric"),
]

const deleteOne = [
	param("id").isNumeric().withMessage("ID must be numeric")
]

module.exports = { postOne, patchStatus, deleteOne }