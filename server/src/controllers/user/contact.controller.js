const asyncHandle = require('../../middlewares/async')
const { Contact } = require('../../models')

// Router: /user/contacts
// Method: POST
exports.createContact = asyncHandle(async (req, res, next) => {
    const { username, email, message } = req.body
    const newContact = await Contact.create({ username, email, message })

    res.status(201).json({
        success: true,
        message: 'New contact successfully created',
        data: newContact
    })
})