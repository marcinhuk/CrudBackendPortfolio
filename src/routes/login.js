const router = require('express').Router()

const controller = require('../controllers/login')
const validator = require('../validators/login')

const isAuth = require('../helpers/isAuth')

router.get('/avatar/:email', validator.avatar, controller.getAvatar)

router.post('/tokenchek', isAuth, controller.tokenCheck)

router.post('/signin', validator.signin, controller.signin)

module.exports = router