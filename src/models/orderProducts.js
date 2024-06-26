const Sequelize = require('sequelize')
const database = require('../db')

const OrderProducts = database.define('orderProducts', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	order_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'orders',
			key: 'id'
		}
	},
	product_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'products',
			key: 'id'
		}
	},
	amount: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
})

module.exports = OrderProducts