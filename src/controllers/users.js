const { validationResult } = require('express-validator')
const fs = require('fs')
const mime = require('mime-types')

const CONSTANTS = require('../../constants')
const User = require('../models/users')

const findAll = async (req, res) => {
	try{
		const users = await User.findAll({
			attributes: { exclude: ['password'] }
		})

		return res.json(users)
	}catch(e){
		error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

		return res.status(500).json(error)
	}
}

const postOne = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const { email, full_name, password } = req.body
		try{
			const user = await User.create({ email, full_name, password})

			return res.json({
				active: user.active,
				admin: user.admin,
				avatar: user.avatar,
				email: user.email,
				full_name: user.full_name,
				id: user.id
			})
		}catch(e){
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(500).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

const avatar = (req, res) => {  //                        TRATAR ARQUIVO DE UPLOAD
	const formidable = require('formidable')
	const form = new formidable.IncomingForm()

	form.parse(req, async (err, fields, files) => {
		const extension =  mime.extension(files.file[0].mimetype)
		const tempFile = files.file[0].filepath
		const newFileName = files.file[0].newFilename+'.'+extension

		const user = await User.findAll({where: {id: fields.id}})

		try{
			fs.unlinkSync(CONSTANTS.FILES.AVATAR+user[0].dataValues.avatar)
		} catch {}

		fs.renameSync(tempFile, CONSTANTS.FILES.AVATAR+newFileName)

		await User.update({ avatar: newFileName}, {where: {id: fields.id}})

		return res.json({ avatar: newFileName })
	})
}

const putOne = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const { email, full_name, password } = req.body
		try{
			const user = await User.update({ email, full_name, password}, {where: {id: req.params.id}})

			return res.json(user)
		}catch(e){
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(500).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

const patchActive = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const id = req.params.id
		const { active } = req.body

		try{
			const user = await User.update({ active }, {where: { id }})

			return res.json(user)
		}catch(e){
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(500).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

const patchAdmin = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const id = req.params.id
		const { admin } = req.body

		try{
			const user = await User.update({ admin }, {where: { id }})

			return res.json(user)
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
			const user = await User.destroy({
				where: {
					id: req.params.id
				}
			})

			return res.json(user)
		}catch(e){
			error = {type: 'MYSQL', message: `Mysql error: ${e.message}`}

			return res.status(500).json(error)
		}
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

module.exports = { findAll, postOne, avatar, putOne, patchActive, patchAdmin, deleteOne }