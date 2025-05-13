const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return next(new ErrorResponse('No token provided', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded.isAdmin) throw new Error()
    next()
  } catch (err) {
    return next(new ErrorResponse('Unauthorized', 401))
  }
}