const { Router } = require("express");

// controllers
const { getDataTables, getDataTable, deleteDataTable, createDataTable, updateDataTable } = require("../controllers/data_table");
// middlewares

const dataTableRoute = Router();

dataTableRoute.get('/', getDataTables);

dataTableRoute.get('/:id', getDataTable);

dataTableRoute.post('/', createDataTable);

dataTableRoute.put('/:id', updateDataTable);

dataTableRoute.delete('/:id', deleteDataTable);

module.exports = dataTableRoute;