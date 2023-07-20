const { request, response } = require('express')
const Customer = require('../models/data/customer');

const getCustomers = (req = request, res = response) => {
    try {
        const { skip = 0, limit = 5 } = req.query;
        const customer = new Customer();
        const data = customer.customerAll();
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

const getCustomer = (req = request, res = response) => {
    try {
        const { id } = req.params;
        const customer = new Customer();
        const data = customer.customerGetOne(id);
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

const deleteCustomer = (req = request, res = response) => {
    try {
        const { id } = req.params;
        const customer = new Customer();
        const data = customer.customerDelete(id);
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

const createCustomer = (req = request, res = response) => {
    try {
        const { name, surname, email, telephone } = req.body;
        const objReg = { name, surname, email };
        if (telephone) {
            objReg.telephone = telephone;
        }
        const customer = new Customer();
        const data = customer.customerCreate(objReg);
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

const updateCustomer = (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, surname, email, telephone, image, state } = req.body;
        const objReg = { name, surname, email, telephone, image, state, id };
        const customer = new Customer();
        const data = customer.customerUpdate(objReg);
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

module.exports = { getCustomers, getCustomer, deleteCustomer, createCustomer, updateCustomer }