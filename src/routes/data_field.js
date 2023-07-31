const { Router } = require("express");

// controllers
const { getDataFields, getDataField, deleteDataField, createDataField, updateDataField } = require("../controllers/data_field");
// middlewares

const dataFieldRoute = Router();

dataFieldRoute.get('/', getDataFields);

dataFieldRoute.get('/:id', getDataField);

dataFieldRoute.post('/', createDataField);

dataFieldRoute.put('/:id', updateDataField);

dataFieldRoute.delete('/:id', deleteDataField);

module.exports = dataFieldRoute;