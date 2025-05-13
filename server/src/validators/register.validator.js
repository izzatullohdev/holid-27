const { body, validationResult } = require('express-validator')

// Router: /register
exports.registerValidator = [
    body('username')
        .notEmpty().withMessage('Please enter a username'),
    body('password')
        .notEmpty().withMessage('Please enter a password'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
]