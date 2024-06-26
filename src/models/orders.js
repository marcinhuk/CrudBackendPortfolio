const Sequelize = require('sequelize')
const database = require('../db')

const Order = database.define('order', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'users',
			key: 'id'
		}
	},
	date: {
		type: Sequelize.DATEONLY,
		default: Sequelize.NOW
	},
	status: {
		type: Sequelize.BOOLEAN,
		default: false,
		allowNull: true
	},
})

module.exports = Order