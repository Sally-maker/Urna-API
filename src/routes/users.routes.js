const { Router } = require('express')

const UsersController = require('../controllers/UserController/UsersController')
const { EnsureAuthenticate } = require('../middleware/EnsureAuthenticate')

const userRoutes = Router()
const userController = new UsersController()

userRoutes.post('/cadastrar', EnsureAuthenticate, userController.create)
userRoutes.get('/', EnsureAuthenticate, userController.index)

module.exports = userRoutes
