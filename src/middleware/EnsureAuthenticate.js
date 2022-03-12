const { verify } = require('jsonwebtoken')

function EnsureAuthenticate(req, res, next) {
  const AuthHeader = req.headers.authorization

  if (!AuthHeader) {
    throw new Error('token is not valid')
  }

  const [, token] = AuthHeader.split(' ')

  try {
    const decoded = verify(token, process.env.SECRECT_KEY, '1d')

    const sub = decoded

    req.params = {
      _id: sub,
    }
    next()
  } catch (error) {
    throw new Error('invalid JWT')
  }
}

module.exports = { EnsureAuthenticate }
