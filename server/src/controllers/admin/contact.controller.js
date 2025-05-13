const ErrorResponse = require('../../utils/errorResponse')
const asyncHandle = require('../../middlewares/async')
const { Contact } = require('../../models')

// Router: /user/contacts
// Method: GET
exports.allContacts = asyncHandle(async (req, res, next) => {
    const contact = await Contact.findAll()
    res.status(200).json({
        success: true,
        data: contact
    })
})

// Router: /admin/contacts/:id
// Method: GET
exports.oneContact = asyncHandle(async (req, res, next) => {
    const contact = await Contact.findByPk(req.params.id)
    if (!contact) return next(new ErrorResponse('Contact not found', 404));
    
    res.status(200).json({
        success: true,
        data: contact
    })
})