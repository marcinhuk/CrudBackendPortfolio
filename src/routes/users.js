const router = require('express').Router()

const users = require('../controllers/users')
const validators = require('../validators/users')

router.get('/', users.findAll)

router.post('/', validators.postOne, users.postOne)

router.post('/avatar', users.avatar)

router.put('/:id', validators.putOne, users.putOne)

router.patch('/active/:id', validators.patchActive, users.patchActive)

router.patch('/admin/:id', validators.patchAdmin, users.patchAdmin)

router.delete('/:id', validators.deleteOne, users.deleteOne)

module.exports = router