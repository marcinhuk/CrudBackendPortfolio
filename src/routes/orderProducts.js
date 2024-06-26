const router = require('express').Router()

const orderProducts = require('../controllers/orderProducts')
const validators = require('../validators/orderProducts')

router.get('/:order_id', validators.findAll, orderProducts.findAll)

router.post('/', validators.postOne, orderProducts.postOne)

router.delete('/:id', validators.deleteOne, orderProducts.deleteOne)

module.exports = router