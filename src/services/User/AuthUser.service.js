const jwt = require('jsonwebtoken')

const { Users } = require('../../schema/Users')

class AuthUser {
  async execute(codigo) {
    const user = await Users.findOne({ codigo })

    if (!user) {
      throw new Error('candidate not exists')
    }

    const token = jwt.sign({}, process.env.SECRECT_KEY, {
      expiresIn: '1d',
    })
    return {
      user,
      token,
    }
  }
}

module.exports = AuthUser
