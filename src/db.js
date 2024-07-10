const Sequelize = require('sequelize')
const CONSTANTS = require('../constants')

const sequelize = new Sequelize(CONSTANTS.MYSQL.DATABASE, CONSTANTS.MYSQL.USER, CONSTANTS.MYSQL.PASSWORD, {
	host: CONSTANTS.MYSQL.HOST,
	port: CONSTANTS.MYSQL.PORT,
	dialect: CONSTANTS.MYSQL.DIALECT,
	timezone: '-03:00',
	logging: CONSTANTS.MYSQL.LOGGING
})

module.exports = sequelize