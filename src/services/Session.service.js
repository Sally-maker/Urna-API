const Users = require('../schema/Users')
const AppError = require('../errors/AppError')

class SessionService {
  async execute(codigo = 0) {
    const user = await Users.findOne({ codigo })

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    return user
  }
}

module.exports = SessionService
