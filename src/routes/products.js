const router = require('express').Router()

const products = require('../controllers/products')
const validators = require('../validators/products')

router.get('/', products.findAll)

router.post('/', validators.postOne, products.postOne)

router.put('/:id', validators.putOne, products.putOne)

router.delete('/:id', validators.deleteOne, products.deleteOne)

module.exports = router