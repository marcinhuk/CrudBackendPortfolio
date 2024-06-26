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

app.use(express.static(CONSTANTS.APP.PUBLIC_PATH))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))  // parse
app.use(cors())

app.use('/login', loginRoute)
app.use('/users', isAuth, isAdmin, usersRoute)
app.use('/products', isAuth, productsRoute)
app.use('/orders', isAuth, ordersRoute)
app.use('/orderproducts', isAuth, orderProductsRoute)

app.get('/', async (req, res) => {
	return res.json({msg: 'API CRUD teste ok!'})
});

(async () => {
	try {
		await database.authenticate()

		//const orderProducts = require('./models/orders')
		await database.sync()

		await app.listen(CONSTANTS.APP.PORT, () => {
			console.log(`Web server running on port ${CONSTANTS.APP.PORT}.`)
		})

		console.log(`Database server running on port ${CONSTANTS.MYSQL.PORT}.`)
	}catch(e){
		console.log(`Erro na conexão com o banco de dados: ${e.message}`)
	}
})()