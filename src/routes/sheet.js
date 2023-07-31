const { Router } = require('express')

// controllers
const { getSheets, getSheet, deleteSheet, createSheet, updateSheet } = require('../controllers/sheet')
// middlewares

const sheetRoute = Router()

sheetRoute.get('/', getSheets)

sheetRoute.get('/:id', getSheet)

sheetRoute.post('/', createSheet)

sheetRoute.put('/:id', updateSheet)

sheetRoute.delete('/:id', deleteSheet)

module.exports = sheetRoute
