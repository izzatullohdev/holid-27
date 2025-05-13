const jwt = require('jsonwebtoken')

const generateToken = () => {
  return jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

module.exports = generateToken
