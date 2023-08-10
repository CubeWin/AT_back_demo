const { request, response } = require('express')
const { v4: uuidv4 } = require('uuid')
const Plain = require('../models/data/plain')

const getPlains = (req = request, res = response) => {
  try {
    const { skip = 0, limit = 5 } = req.query
    const plain = new Plain()
    const data = plain.plainAll()
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
const getPlain = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const plain = new Plain();
    const data = plain.plainGetOne(id);
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
const createPlain = (req = request, res = response) => {
  try {
    const id_plain = uuidv4();
    const { full_text } = req.body;
    const objReg = { id_plain, full_text };
    const plain = new Plain();
    const data = plain.plainCreate(objReg);
    const objResponse = {
      success: true,
      message: 'Data found',
      data: {
        request: {...data, id: id_plain},
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
const updatePlain = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { full_text } = req.body;
    const objReg = { full_text, id };
    const plain = new Plain();
    const data = plain.plainUpdate(objReg);
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
const deletePlain = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const plain = new Plain();
    const data = plain.plainDelete(id);
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

module.exports = { getPlains, getPlain, createPlain, updatePlain, deletePlain }
