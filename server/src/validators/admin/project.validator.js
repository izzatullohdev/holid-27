const { body, validationResult } = require('express-validator')

// Router: /certificates
exports.createProjectValidator = [
    body('title')
        .notEmpty().withMessage('Please enter a title'),
    body('description')
        .notEmpty().withMessage('Please enter a description'),
    body('technologies')
        .notEmpty().withMessage('Please include the technologies you used'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
]

// Router: /certificates/:id
exports.updateProjectValidator = [
    body('title')
        .notEmpty().withMessage('Please enter a title'),
    body('description')
        .notEmpty().withMessage('Please enter a description'),
    body('technologies')
        .notEmpty().withMessage('Please include the technologies you used'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
]