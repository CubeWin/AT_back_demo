const { Router } = require("express");

// controllers
const { getCustomers, getCustomer, deleteCustomer, createCustomer, updateCustomer } = require("../controllers/customer");
// middlewares

const customerRoute = Router();

customerRoute.get('/', getCustomers);

customerRoute.get('/:id', getCustomer);

customerRoute.post('/', createCustomer);

customerRoute.put('/:id', updateCustomer);

customerRoute.delete('/:id', deleteCustomer);

module.exports = customerRoute;