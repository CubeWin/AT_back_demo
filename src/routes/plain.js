const { Router } = require('express')

// controllers
const { getPlains, getPlain, deletePlain, createPlain, updatePlain } = require('../controllers/plain')
// middlewares

const plainRoute = Router()

plainRoute.get('/', getPlains)

plainRoute.get('/:id', getPlain)

plainRoute.post('/', createPlain)

plainRoute.put('/:id', updatePlain)

plainRoute.delete('/:id', deletePlain)

module.exports = plainRoute
