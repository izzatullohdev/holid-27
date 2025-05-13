const { Router } = require('express')
const router = Router()
// controller
const { allNetworks } = require('../../controllers/user/network.controller')

router.get('/networks', allNetworks)

module.exports = router