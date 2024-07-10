const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const CONSTANTS = require('./../../constants')

const User = require('../models/users')

const tokenCheck = async (req, res) => {
	const token = req.newToken

	return res.json(token)
}

const getAvatar = async (req, res) => {
	if (validationResult(req).errors.length == 0){

		try{
			const email = req.params.email

			const user = await User.findAll({where: {email}})

			if (user.length > 0){

				return res.json({avatar: user[0].dataValues.avatar})
			}else{
				return res.status(204).json()
			}
		}catch(e) {
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(500).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

const signin = async (req, res) => {
	if (validationResult(req).errors.length == 0){

		try{
			const user = await User.findAll({where: {email: req.body.email, password: req.body.password}})

			if (user.length > 0){
				var token = jwt.sign({
					iat: Math.floor(Date.now() / 1000),
					exp: Math.floor(Date.now() / 1000) + (CONSTANTS.JWT.TIME),
					user_id: user[0].dataValues.id,
					full_name: user[0].dataValues.full_name,
					admin: user[0].dataValues.admin,
				}, CONSTANTS.JWT.SECRET, {algorithm: 'HS256'})

				return res.json({token: 'Bearer '+token, full_name: user[0].dataValues.full_name, admin: user[0].dataValues.admin, avatar: user[0].dataValues.avatar})
			}else{
				return res.status(204).json()
			}
		}catch(e) {
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(502).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

module.exports = { tokenCheck, getAvatar, signin }