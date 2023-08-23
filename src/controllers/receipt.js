const { request, response } = require('express');
const ReceiptDao = require('../models/data/receipt');

const getReceipts = (req = request, res = response) => {
  try {
    const receiptDao = new ReceiptDao();
    const receipts = receiptDao.receiptAll();
    const objResponse = {
      success: true,
      message: 'Data found',
      data: {
        request: receipts,
        pagination: {
          current_page: 1,
          next_page: null,
          previous_page: null,
          total_pages: null,
          per_page: null,
          total_entries: null,
        },
      },
    };
    res.status(200).json(objResponse);
  } catch (error) {
    const objResponse = {
      success: false,
      message: '',
      error_code: 1306,
      data: {},
      error,
    };
    res.status(500).json(objResponse);
  }
};

const getReceipt = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const receiptDao = new ReceiptDao();
    const receipt = receiptDao.receiptGetOne(id);
    const objResponse = {
      success: true,
      message: 'Data found',
      data: {
        request: receipt,
      },
    };
    res.status(200).json(objResponse);
  } catch (error) {
    const objResponse = {
      success: false,
      message: '',
      error_code: 1306,
      data: {},
      error,
    };
    res.status(500).json(objResponse);
  }
};

const deleteReceipt = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const receiptDao = new ReceiptDao();
    const result = receiptDao.receiptDelete(id);
    const objResponse = {
      success: true,
      message: 'Data delete',
      data: {
        request: result,
      },
    };
    res.status(200).json(objResponse);
  } catch (error) {
    const objResponse = {
      success: false,
      message: '',
      error_code: 1306,
      data: {},
      error,
    };
    res.status(500).json(objResponse);
  }
};

const createReceipt = (req = request, res = response) => {
  try {
    const receiptData = req.body;
    const receiptDao = new ReceiptDao();
    const result = receiptDao.receiptCreate(receiptData);
    const objResponse = {
      success: true,
      message: 'Data created successfully',
      data: {
        request: result,
      },
    };
    res.status(201).json(objResponse);
  } catch (error) {
    const objResponse = {
      success: false,
      message: '',
      error_code: 1306,
      data: {},
      error,
    };
    res.status(500).json(objResponse);
  }
};

const updateReceipt = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const receiptData = req.body; 
    const receiptDao = new ReceiptDao();
    const result = receiptDao.receiptUpdate({ ...receiptData, id });
    const objResponse = {
      success: true,
      message: 'Data updated successfully',
      data: {
        request: result,
      },
    };
    res.status(200).json(objResponse);
  } catch (error) {
    const objResponse = {
      success: false,
      message: '',
      error_code: 1306,
      data: {},
      error,
    };
    res.status(500).json(objResponse);
  }
};

module.exports = { getReceipts, getReceipt, deleteReceipt, createReceipt, updateReceipt };
