const ErrorResponse = require('../../utils/errorResponse')
const asyncHandle = require('../../middlewares/async')
const { Network } = require('../../models')

// Router: /admin/networks
// Method: GET
exports.allNetworks = asyncHandle(async (req, res, next) => {
    const networks = await Network.findAll()
    res.status(200).json({
        success: true,
        data: networks
    })
})

// Router: /admin/networks
// Method: POST
exports.createNetworks = asyncHandle(async (req, res, next) => {
    const networks = await Network.findAll()
    console.log(networks)
    if (networks.length > 0) return next(new ErrorResponse('Networks already created, please delete old networks or update them'))

    const { linkedin, instagram, youtube, telegram } = req.body
    const newNetwork = await Network.create({ linkedin, instagram, youtube, telegram })

    res.status(201).json({
        success: true,
        message: 'Network successfully created',
        data: newNetwork
    })
})

// Router: /admin/networks/:id
// Method: PUT
exports.updateNetwork = asyncHandle(async (req, res, next) => {
    const { linkedin, instagram, youtube, telegram } = req.body
    const [updatedRows] = await Network.update(
        { linkedin, instagram, youtube, telegram },
        { where: { id: req.params.id } }
    )

    if (updatedRows === 0) return next(new ErrorResponse('Network not found', 404));

    res.status(200).json({
        success: true,
        message: 'Network successfully updated'
    })
})

// Router: /admin/networks/:id
// Method: DELETE
exports.deleteNetwork = asyncHandle(async (req, res, next) => {
    const deletedRows = await Network.destroy({ where: { id: req.params.id } })
    if (deletedRows === 0) return next(new ErrorResponse('Network not found', 404));

    res.status(200).json({
        success: true,
        message: 'Network successfully destroyed'
    })
})