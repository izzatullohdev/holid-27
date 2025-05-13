const { Router } = require('express')
const router = Router()
// controller
const { register } = require('../controllers/register.controller')
// limiter
const limiter = require('../middlewares/limiter')
// validators
const { registerValidator } = require('../validators/register.validator')

router.post('/register', registerValidator, limiter, register)

module.exports = router