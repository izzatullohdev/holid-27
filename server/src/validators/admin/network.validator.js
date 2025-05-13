const { body, validationResult } = require('express-validator')

// Router: /certificates
exports.createNetworkValidator = [
    body('linkedin')
        .notEmpty().withMessage('Please enter a link of linkedin')
        .isURL().withMessage('Please enter a correct link'),
    body('instagram')
        .notEmpty().withMessage('Please enter a link of instagram')
        .isURL().withMessage('Please enter a correct link'),
    body('youtube')
        .notEmpty().withMessage('Please enter a link of youtube')
        .isURL().withMessage('Please enter a correct link'),
    body('telegram')
        .notEmpty().withMessage('Please enter a link of telegram')
        .isURL().withMessage('Please enter a correct link'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
]

// Router: /certificates/:id
exports.updateNetworkValidator = [
    body('linkedin')
        .notEmpty().withMessage('Please enter a link of linkedin')
        .isURL().withMessage('Please enter a correct link'),
    body('instagram')
        .notEmpty().withMessage('Please enter a link of instagram')
        .isURL().withMessage('Please enter a correct link'),
    body('youtube')
        .notEmpty().withMessage('Please enter a link of youtube')
        .isURL().withMessage('Please enter a correct link'),
    body('telegram')
        .notEmpty().withMessage('Please enter a link of telegram')
        .isURL().withMessage('Please enter a correct link'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
]