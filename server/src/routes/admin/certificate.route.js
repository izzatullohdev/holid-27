const { Router } = require('express')
const router = Router()
// controller
const { allCertificates, oneCertificate, createCertificate, updateCertificate, deleteCertificate } = require('../../controllers/admin/certificate.controller')
// check admin
const isAdmin = require('../../middlewares/isAdmin')
// validators
const { createCertificateValidator, updateCertificateValidator } = require('../../validators/admin/certificate.validator')

router.get('/certificates', isAdmin, allCertificates)
router.get('/certificates/:id', isAdmin, oneCertificate)
router.post('/certificates', createCertificateValidator, isAdmin, createCertificate)
router.put('/certificates/:id', updateCertificateValidator, isAdmin, updateCertificate)
router.delete('/certificates/:id', isAdmin, deleteCertificate)

module.exports = router