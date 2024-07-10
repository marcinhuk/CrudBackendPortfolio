const { validationResult } = require('express-validator')

const OrderProducts = require('../models/orderProducts')

const findAll = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const order_id  = req.params.order_id

		try{
			const database = require('../db')

			const [orderProducts, metadata] = await database.query(`select orderproducts.id, products.name, products.price, orderproducts.amount from orderproducts, products where orderproducts.product_id = products.id and order_id = ${order_id}`)

			return res.json(orderProducts)
		}catch(e){
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(500).json(error)
		}
	} else {
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

const postOne = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const { order_id, product_id, amount } = req.body

		try{
			const orderProducts = await OrderProducts.create({ order_id, product_id, amount })

			return res.json(orderProducts)
		}catch(e){
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(500).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

const deleteOne = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		try{
			const orderProducts = await OrderProducts.destroy({
				where: {
					id: req.params.id
				}
			})

			return res.json(orderProducts)
		}catch(e){
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(500).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

module.exports = { findAll, postOne, deleteOne }