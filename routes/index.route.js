const router = require('express').Router()
const userControllers = require('../controllers/user.controller')

router.get('/user/account/:number', userControllers.getUserByAccount)
router.get('/user/identity/:number', userControllers.getUserByIdentity)
router.post('/user', userControllers.createUser)
router.put('/user/:id', userControllers.updateUser)
router.delete('/user/:id', userControllers.deleteUser)

module.exports = router