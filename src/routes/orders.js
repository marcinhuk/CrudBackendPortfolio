const router = require('express').Router()

const orders = require('../controllers/orders')
const validators = require('../validators/orders')

router.get('/', orders.findAll)

router.get('/approval', orders.findApproval)

router.post('/', orders.postOne)

router.patch('/approval/:id', validators.patchStatus, orders.patchStatus)

router.delete('/:id', validators.deleteOne, orders.deleteOne)

module.exports = router