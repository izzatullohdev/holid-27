const ErrorResponse = require('../../utils/errorResponse')
const asyncHandle = require('../../middlewares/async')
const { Certificate } = require('../../models')

// Router: /user/certificates
// Method: GET
exports.allCertificates = asyncHandle(async (req, res, next) => {
    const certificates = await Certificate.findAll()
    res.status(200).json({
        success: true,
        data: certificates
    })
})

// Router: /user/certificates
// Method: GET
exports.oneCertificate = asyncHandle(async (req, res, next) => {
    const certificate = await Certificate.findByPk(req.params.id)
    if (!certificate) return next(new ErrorResponse('Certificate not found', 404));
    
    res.status(200).json({
        success: true,
        data: certificate
    })
})