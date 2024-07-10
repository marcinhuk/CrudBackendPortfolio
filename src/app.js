const express = require('express')
const app = express()
const cors = require('cors')

const database = require('./db')
const CONSTANTS = require('../constants')
const isAuth = require('./helpers/isAuth')
const isAdmin = require('./helpers/isAadmin')

const loginRoute = require('./routes/login')
const usersRoute = require('./routes/users')
const productsRoute = require('./routes/products')
const ordersRoute = require('./routes/orders')
const orderProductsRoute = require('./routes/orderProducts')

const reportOrdersRoute = require('./routes/reports/orders')
const reportOrderRoute = require('./routes/reports/order')
const reportProductsRoute = require('./routes/reports/products')
const reportUsersRoute = require('./routes/reports/users')

app.use(express.static(CONSTANTS.APP.PUBLIC_PATH))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))  // parse
app.use(cors())

app.use('/login', loginRoute)
app.use('/users', isAuth, isAdmin, usersRoute)
app.use('/products', isAuth, productsRoute)
app.use('/orders', isAuth, ordersRoute)
app.use('/orderproducts', isAuth, orderProductsRoute)

app.use('/reports/orders', isAuth, reportOrdersRoute)
app.use('/reports/order/:id', isAuth, reportOrderRoute)
app.use('/reports/products', isAuth, reportProductsRoute)
app.use('/reports/users', isAuth, reportUsersRoute)

app.get('/', async (req, res) => {
	return res.json({msg: 'API CRUD teste ok!'})
});

(async () => {
	try {
		await database.authenticate()

		// await database.sync()
		// const User = require('./models/users')
		// await User.create({ email: "admin", full_name: "admin", password: "admin"})

		await app.listen(CONSTANTS.APP.PORT, () => {
			console.log(`Web server running on port ${CONSTANTS.APP.PORT}.`)
		})

		console.log(`Database server running on port ${CONSTANTS.MYSQL.PORT}.`)
	}catch(e){
		console.log(`Erro na conexão com o banco de dados: ${e.message}`)
	}
})()