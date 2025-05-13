const { Router } = require('express')
const router = Router()
// controller
const { allNetworks, createNetworks, updateNetwork, deleteNetwork } = require('../../controllers/admin/network.controller')
// check admin
const isAdmin = require('../../middlewares/isAdmin')
// validators
const { createNetworkValidator, updateNetworkValidator } = require('../../validators/admin/network.validator')

router.get('/networks', isAdmin, allNetworks)
router.post('/networks', createNetworkValidator, isAdmin, createNetworks)
router.put('/networks/:id', updateNetworkValidator, isAdmin, updateNetwork)
router.delete('/networks/:id', isAdmin, deleteNetwork)

module.exports = router