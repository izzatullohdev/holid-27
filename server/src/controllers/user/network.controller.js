const ErrorResponse = require('../../utils/errorResponse')
const asyncHandle = require('../../middlewares/async')
const { Network } = require('../../models')

// Router: /user/networks
// Method: GET
exports.allNetworks = asyncHandle(async (req, res, next) => {
    const networks = await Network.findAll()
    res.status(200).json({
        success: true,
        data: networks
    })
})