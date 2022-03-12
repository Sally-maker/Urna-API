const CreateUserService = require('../../services/User/CreateUser.service')
const { Users } = require('../../schema/Users')

class UsersController {
  async index(request, response, next) {
    try {
      const users = await Users.find()

      return response.json(users)
    } catch (error) {
      next(error)
    }
  }

  async create(request, response, next) {
    try {
      const { codigo, tipo } = request.body

      const createUser = new CreateUserService()

      const user = await createUser.execute({
        codigo,
        tipo,
      })

      return response.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UsersController
