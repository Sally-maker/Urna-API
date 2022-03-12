const AuthUser = require('../../services/User/AuthUser.service')

class SessionController {
  async auth(request, response, next) {
    try {
      const { codigo } = request.body

      const session = new AuthUser()

      const user = await session.execute(codigo)

      return response.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { SessionController }
