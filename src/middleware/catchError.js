const AppError = require('../errors/AppError')

const catchError = (error, request, response, next) => {
  return error instanceof AppError
    ? response.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      })
    : response.status(500).json({
        status: 500,
        message: 'Internal server error',
      })
}

module.exports = catchError
