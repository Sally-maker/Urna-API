const Users = require('../schema/Users')
const AppError = require('../errors/AppError')

class CreateUserService {
  async execute({ codigo = 0, tipo = '' }) {
    const userExists = await Users.findOne({ codigo })

    if (userExists) {
      throw new AppError('Usuário já cadastrado')
    }

    const user = new Users({
      codigo,
      votou: false,
      tipo,
    })

    await user.save()

    return user
  }
}

module.exports = CreateUserService
