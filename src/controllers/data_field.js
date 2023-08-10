const { request, response } = require('express')
const { v4: uuidv4 } = require('uuid');
const Data_field = require('../models/data/data_field');

const getDataFields = (req = request, res = response) => {
    try {
        const { skip = 0, limit = 5 } = req.query;
        const data_field = new Data_field();
        const data = data_field.dataFieldAll();
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

const getDataField = (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data_field = new Data_field();
        const data = data_field.dataFieldGetOne(id);
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

const deleteDataField = (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data_field = new Data_field();
        const data = data_field.dataFieldDelete(id);
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

const createDataField = (req = request, res = response) => {
    try {
        const { id_data_table, field_name } = req.body;
        const id_data_field = uuidv4();
        const objReg = { id_data_field, id_data_table, field_name };
        const data_field = new Data_field();
        const data = data_field.dataFieldCreate(objReg);
        const objResponse = {
            success: true,
            message: 'Data found',
            data: {
                request: { ...data, id: id_data_field },
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

const updateDataField = (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { field_name } = req.body;
        const objReg = { field_name, id };
        const data_field = new Data_field();
        const data = data_field.dataFieldUpdate(objReg);
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

module.exports = { getDataFields, getDataField, deleteDataField, createDataField, updateDataField }