const { body, validationResult } = require('express-validator')

// Router: /user/contacts
exports.contactValidator = [
    body('username')
        .notEmpty().withMessage('Please enter a username'),
    body('email')
        .notEmpty().withMessage('Please enter an email')
        .isEmail().withMessage('Please enter a correct email'),
    body('message')
        .notEmpty().withMessage('Please enter a message'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
]