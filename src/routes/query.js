const { Router } = require('express')

// controllers
const { getQuerys, getQuery, deleteQuery, createQuery, updateQuery } = require('../controllers/query')
// middlewares

const queryRoute = Router()

queryRoute.get('/', getQuerys)

queryRoute.get('/:id', getQuery)

queryRoute.post('/', createQuery)

queryRoute.put('/:id', updateQuery)

queryRoute.delete('/:id', deleteQuery)

module.exports = queryRoute
