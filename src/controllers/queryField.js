const { request, response } = require('express')
const { v4: uuidv4 } = require('uuid')
const QueryField = require('../models/data/queryField')

const getQueryFields = (req = request, res = response) => {
  try {
    const { skip = 0, limit = 5 } = req.query
    const queryField = new QueryField()
    const data = queryField.queryFieldAll()
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
const getQueryField = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const queryField = new QueryField();
    const data = queryField.queryFieldGetOne(id);
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
const createQueryField = (req = request, res = response) => {
  try {
    const id_query_field = uuidv4();
    const { id_query, field_name, is_active } = req.body;
    const objReg = { id_query_field, id_query, field_name, is_active };
    const queryField = new QueryField();
    console.log(objReg);
    const data = queryField.queryFieldCreate(objReg);
    const objResponse = {
      success: true,
      message: 'Data found',
      data: {
        request: { ...data, id: id_query_field },
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
const updateQueryField = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { id_query, field_name, is_active } = req.body;
    const objReg = { id_query, field_name, is_active, id };
    const queryField = new QueryField();
    const data = queryField.queryFieldUpdate(objReg);
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
const deleteQueryField = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const queryField = new QueryField();
    const data = queryField.queryFieldDelete(id);
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

module.exports = { getQueryFields, getQueryField, createQueryField, updateQueryField, deleteQueryField }
