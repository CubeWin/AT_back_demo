const { Router } = require('express')

// controllers
const { getProjects, getProject, deleteProject, createProject, updateProject } = require('../controllers/project')
// middlewares

const projectRoute = Router()

projectRoute.get('/', getProjects)

projectRoute.get('/:id', getProject)

projectRoute.post('/', createProject)

projectRoute.put('/:id', updateProject)

projectRoute.delete('/:id', deleteProject)

module.exports = projectRoute
