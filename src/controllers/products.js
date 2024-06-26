const { validationResult } = require('express-validator')

const Product = require('../models/products')

const findAll = async (req, res) => {
	try{
		const users = await Product.findAll({
			order: [
				['id', 'DESC']
			]
		})

		return res.json(users)
	}catch(e){
		error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

		return res.status(500).json(error)
	}
}

const postOne = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const { name, price } = req.body

		try{
			const product = await Product.create({ name, price })

			return res.json({id: product.id, name: product.name, price: product.price})
		}catch(e){
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(500).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

const putOne = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const { name, price } = req.body

		try{
			const product = await Product.update({ name, price }, {where: {id: req.params.id}})

			return res.json(product)
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
			const product = await Product.destroy({
				where: {
					id: req.params.id
				}
			})

			return res.json(product)
		}catch(e){
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(500).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

module.exports = { findAll, postOne, putOne, deleteOne }