const { Router } = require('express')
const router = Router()
// controller
const { allContacts, oneContact } = require('../../controllers/admin/contact.controller')

router.get('/contacts', allContacts)
router.get('/contacts/:id', oneContact)

module.exports = router