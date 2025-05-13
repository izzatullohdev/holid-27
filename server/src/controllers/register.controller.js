const ErrorResponse = require('../utils/errorResponse')
const asyncHandle = require('../middlewares/async')
const generateToken = require('../utils/generateToken')

// .env
const { ADMIN_NAME, ADMIN_PASSWORD } = process.env

// Router: /admin/register
// Method: POST
exports.register = asyncHandle(async (req, res, next) => {
    const { username, password } = req.body
    if (username !== ADMIN_NAME || password !== ADMIN_PASSWORD) {
        return next(new ErrorResponse('Incorrect username or password, please try again', 400))
    }

    const token = generateToken()

    res.status(200).json({
        success: true,
        message: 'Congratulations, you are admin',
        token
    })
})