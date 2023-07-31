const { request, response } = require('express')
const Data_table = require('../models/data/data_table');

const getDataTables = (req = request, res = response) => {
    try {
        const { skip = 0, limit = 5 } = req.query;
        const data_table = new Data_table();
        const data = data_table.dataTableAll();
        const objResponse = {
            success: true,
            message: 'Data found',
            data: {
                request: data,
                pagination: {
                    current_page: 1,
                    next_page: null,
                    previous_page: null,
                    total_pages: null,
                    per_page: null,
                    total_entries: null
                }
            },
        }
        res.status(200).json(objResponse);
    } catch (error) {
        const objResponse = {
            success: false,
            message: "",
            error_code: 1306,
            data: {},
            error,
        }
        res.status(500).json(objResponse);
    }
}

const getDataTable = (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data_table = new Data_table();
        const data = data_table.dataTableGetOne(id);
        const objResponse = {
            success: true,
            message: 'Data found',
            data: {
                request: data,
            },
        }
        res.status(200).json(objResponse);
    } catch (error) {
        const objResponse = {
            success: false,
            message: "",
            error_code: 1306,
            data: {},
            error,
        }
        res.status(500).json(objResponse);
    }
}

const deleteDataTable = (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data_table = new Data_table();
        const data = data_table.dataTableDelete(id);
        const objResponse = {
            success: true,
            message: 'Data delete',
            data: {
                request: data,
            },
        }
        res.status(200).json(objResponse);
    } catch (error) {
        const objResponse = {
            success: false,
            message: "",
            error_code: 1306,
            data: {},
            error,
        }
        res.status(500).json(objResponse);
    }
}

const createDataTable = (req = request, res = response) => {
    try {
        const { table_name, description } = req.body;
        const objReg = { table_name, description };
        const data_table = new Data_table();
        const data = data_table.dataTableCreate(objReg);
        const objResponse = {
            success: true,
            message: 'Data found',
            data: {
                request: data,
            },
        }
        res.status(200).json(objResponse);
    } catch (error) {
        const objResponse = {
            success: false,
            message: "",
            error_code: 1306,
            data: {},
            error,
        }
        res.status(500).json(objResponse);
    }
}

const updateDataTable = (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { table_name, description } = req.body;
        const objReg = { table_name, description, id };
        const data_table = new Data_table();
        const data = data_table.dataTableUpdate(objReg);
        const objResponse = {
            success: true,
            message: 'Data found',
            data: {
                request: data,
            },
        }
        res.status(200).json(objResponse);
    } catch (error) {
        const objResponse = {
            success: false,
            message: "",
            error_code: 1306,
            data: {},
            error,
        }
        res.status(500).json(objResponse);
    }
}

module.exports = { getDataTables, getDataTable, deleteDataTable, createDataTable, updateDataTable }