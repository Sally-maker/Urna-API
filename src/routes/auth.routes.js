const { Router } = require('express')

const {
  SessionController,
} = require('../controllers/UserController/SessionController')

const sessionRoutes = Router()
const sessionController = new SessionController()

sessionRoutes.post('/authUser', sessionController.auth)

module.exports = sessionRoutes
