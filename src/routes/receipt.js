const { Router } = require('express');

// controllers
const { getReceipts, getReceipt, deleteReceipt, createReceipt, updateReceipt } = require('../controllers/receipt');

// middlewares

const receiptRoute = Router();

receiptRoute.get('/', getReceipts);

receiptRoute.get('/:id', getReceipt);

receiptRoute.post('/', createReceipt);

receiptRoute.put('/:id', updateReceipt);

receiptRoute.delete('/:id', deleteReceipt);

module.exports = receiptRoute;
