const { validationResult } = require('express-validator')

const Order = require('../models/orders')

const findAll = async (req, res) => {
	try{
		const database = require('../db')

		const [orders, metadata] = await database.query(`select orders.id, DATE_FORMAT(orders.date, '%m-%d-%Y %H:%i:%s') as date, orders.status, users.full_name from orders, users where orders.user_id=users.id and users.id = ${req.user_id} order by orders.id desc`)

		return res.json(orders)
	}catch(e){
		error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

		return res.status(500).json(error)
	}
}

const findApproval = async (req, res) => {
	try{
		const database = require('../db')

		const [orders, metadata] = await database.query(`select orders.id, DATE_FORMAT(orders.date, '%m-%d-%Y %h:%i:%s') as date, orders.status, users.full_name from orders, users where orders.user_id=users.id and orders.status is null order by orders.id desc`)

		return res.json(orders)
	}catch(e){
		error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

		return res.status(500).json(error)
	}
}

const postOne = async (req, res) => {
	const user_id = req.user_id

	try{
		const order = await Order.create({ user_id })

		return res.json(order)
	}catch(e){
		error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

		return res.status(500).json(error)
	}
}

const patchStatus = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const id = req.params.id
		const { status } = req.body

		try{
			const order = await Order.update({ status }, {where: {id}})

			return res.json(order)
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
			const order = await Order.destroy({
				where: {
					id: req.params.id
				}
			})

			return res.json(order)
		}catch(e){
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

		return res.status(500).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

module.exports = { findAll, findApproval, postOne, patchStatus, deleteOne }