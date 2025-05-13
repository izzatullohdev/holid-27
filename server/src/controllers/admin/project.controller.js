const ErrorResponse = require('../../utils/errorResponse')
const asyncHandle = require('../../middlewares/async')
const { Project } = require('../../models')

// Router: /admin/projects
// Method: GET
exports.allProjects = asyncHandle(async (req, res, next) => {
    const projects = await Project.findAll()
    res.status(200).json({
        success: true,
        data: projects
    })
})

// Router: /admin/projects
// Method: GET
exports.oneProject = asyncHandle(async (req, res, next) => {
    const project = await Project.findByPk(req.params.id)
    if (!project) return next(new ErrorResponse('Project not found', 404));
    
    res.status(200).json({
        success: true,
        data: project
    })
})

// Router: /admin/projects
// Method: POST
exports.createProject = asyncHandle(async (req, res, next) => {
    const { title, description, technologies, githubLink, liveDemoLink } = req.body
    const newProject = await Project.create({
        title,
        description,
        technologies,
        githubLink,
        liveDemoLink
    })

    res.status(201).json({
        success: true,
        message: 'New project successfully created',
        data: newProject
    })
})

// Router: /admin/projects/:id
// Method: PUT
exports.updateProject = asyncHandle(async (req, res, next) => {
    const { title, description, technologies, githubLink, liveDemoLink } = req.body
    const [updatedRows] = await Project.update(
        { title, description, technologies, githubLink, liveDemoLink },
        { where: { id: req.params.id } }
    )

    if (updatedRows === 0) return next(new ErrorResponse('Project not found', 404));

    res.status(200).json({
        success: true,
        message: 'Project successfully updated'
    })
})

// Router: /admin/projects/:id
// Method: DELETE
exports.deleteProject = asyncHandle(async (req, res, next) => {
    const deletedRows = await Project.destroy({ where: { id: req.params.id } })
    if (deletedRows === 0) return next(new ErrorResponse('Project not found', 404));

    res.status(200).json({
        success: true,
        message: 'Project successfully destroyed'
    })
})