const { Router } = require('express')
const router = Router()
// controller
const { allProjects, oneProject, createProject, updateProject, deleteProject } = require('../../controllers/admin/project.controller')
// check admin
const isAdmin = require('../../middlewares/isAdmin')
// validators
const { createProjectValidator, updateProjectValidator } = require('../../validators/admin/project.validator')

router.get('/projects', isAdmin, allProjects)
router.get('/projects/:id', isAdmin, oneProject)
router.post('/projects', createProjectValidator, isAdmin, createProject)
router.put('/projects/:id', updateProjectValidator, isAdmin, updateProject)
router.delete('/projects/:id', isAdmin, deleteProject)

module.exports = router