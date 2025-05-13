const { Router } = require('express')
const router = Router()
// controller
const { createContact } = require('../../controllers/user/contact.controller')
// limiter
const limiter = require('../../middlewares/limiter')
// validators
const { contactValidator } = require('../../validators/user/contact.validator')

router.post('/contacts', contactValidator, limiter, createContact)

module.exports = router