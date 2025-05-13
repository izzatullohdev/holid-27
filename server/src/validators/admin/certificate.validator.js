const { body, validationResult } = require('express-validator')

// Router: /certificates
exports.createCertificateValidator = [
    body('title')
        .notEmpty().withMessage('Please enter a title'),
    body('info')
        .notEmpty().withMessage('Please enter an info'),
    body('certificateLink')
        .notEmpty().withMessage('Please enter a certificate link'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
]

// Router: /certificates/:id
exports.updateCertificateValidator = [
    body('title')
        .notEmpty().withMessage('Please enter a title'),
    body('info')
        .notEmpty().withMessage('Please enter an info'),
    body('certificateLink')
        .notEmpty().withMessage('Please enter a certificate link'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
]