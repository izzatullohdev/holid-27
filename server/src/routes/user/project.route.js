const { Router } = require('express')
const router = Router()
// controller
const { allProjects, oneProject } = require('../../controllers/user/project.controller')

router.get('/projects', allProjects)
router.get('/projects/:id', oneProject)

module.exports = router