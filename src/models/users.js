const Sequelize = require('sequelize')
const database = require('../db')

const User = database.define('user', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	email: {
		type: Sequelize.STRING(100),
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	full_name: {
		type: Sequelize.STRING(150),
		allowNull: false
	},
	avatar: {
		type: Sequelize.STRING(100),
		defaultValue: 'default.jpeg',
		allowNull: false
	},
	active: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
		allowNull: false
	},
	admin: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false
	},
})

module.exports = User