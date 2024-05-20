const router = require('express').Router()
const userControllers = require('../controllers/user.controller')

router.get('/user/account', userControllers.getUserByAccount)
router.get('/user/identity', userControllers.getUserByIdentity)
router.post('/user', userControllers.createUser)
router.put('/user/:id', userControllers.updateUser)
router.delete('/user/:id', userControllers.deleteUser)

module.exports = router