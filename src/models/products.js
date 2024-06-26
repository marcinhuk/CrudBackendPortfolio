const Sequelize = require('sequelize')
const database = require('../db')

const Product = database.define('product', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING(150),
		allowNull: false
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false
	}
})

module.exports = Product