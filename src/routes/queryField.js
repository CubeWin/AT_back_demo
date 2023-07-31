const { Router } = require('express')

// controllers
const { getQueryFields, getQueryField, deleteQueryField, createQueryField, updateQueryField } = require('../controllers/queryField')
// middlewares

const queryFieldRoute = Router()

queryFieldRoute.get('/', getQueryFields)

queryFieldRoute.get('/:id', getQueryField)

queryFieldRoute.post('/', createQueryField)

queryFieldRoute.put('/:id', updateQueryField)

queryFieldRoute.delete('/:id', deleteQueryField)

module.exports = queryFieldRoute
