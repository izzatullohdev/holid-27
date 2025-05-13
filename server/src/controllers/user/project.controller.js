const ErrorResponse = require('../../utils/errorResponse')
const asyncHandle = require('../../middlewares/async')
const { Project } = require('../../models')

// Router: /user/projects
// Method: GET
exports.allProjects = asyncHandle(async (req, res, next) => {
    const projects = await Project.findAll()
    res.status(200).json({
        success: true,
        data: projects
    })
})

// Router: /user/projects
// Method: GET
exports.oneProject = asyncHandle(async (req, res, next) => {
    const project = await Project.findByPk(req.params.id)
    if (!project) return next(new ErrorResponse('Project not found', 404));
    
    res.status(200).json({
        success: true,
        data: project
    })
})