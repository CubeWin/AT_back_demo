const { request, response } = require('express')
const Query = require('../models/data/query')

const getQuerys = (req = request, res = response) => {
  try {
    const { skip = 0, limit = 5 } = req.query
    const query = new Query()
    const data = query.queryAll()
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
      }
    }
    res.status(200).json(objResponse)
  } catch (error) {
    const objResponse = {
      success: false,
      message: '',
      error_code: 1306,
      data: {},
      error
    }
    res.status(500).json(objResponse)
  }
}
const getQuery = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const query = new Query();
    const data = query.queryGetOne(id);
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
const createQuery = (req = request, res = response) => {
  try {
    const { id_data_table, name } = req.body;
    const objReg = { id_data_table, name };
    const query = new Query();
    const data = query.queryCreate(objReg);
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
const updateQuery = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { id_data_table, name } = req.body;
    const objReg = { id_data_table, name, id };
    const query = new Query();
    const data = query.queryUpdate(objReg);
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
const deleteQuery = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const query = new Query();
    const data = query.queryDelete(id);
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

module.exports = { getQuerys, getQuery, createQuery, updateQuery, deleteQuery }
