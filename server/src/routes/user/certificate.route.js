const { Router } = require('express')
const router = Router()
// controller
const { allCertificates, oneCertificate } = require('../../controllers/user/certificate.controller')

router.get('/certificates', allCertificates)
router.get('/certificates/:id', oneCertificate)

module.exports = router