const { Router } = require('express')

const candidatesRoutes = require('./candidates.routes')
const userRoutes = require('./users.routes')
const sessionRoutes = require('./auth.routes')
const { EnsureAuthenticate } = require('../middleware/EnsureAuthenticate')

const routes = Router()

routes.use('/candidatos', EnsureAuthenticate, candidatesRoutes)
routes.use('/usuarios', userRoutes)
routes.use('/auth', sessionRoutes)

module.exports = routes
