const { request, response } = require('express')
const Sheet = require('../models/data/sheet')

const getSheets = (req = request, res = response) => {
  try {
    const { skip = 0, limit = 5 } = req.query
    const sheet = new Sheet()
    const data = sheet.sheetAll()
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
const getSheet = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const sheet = new Sheet();
    const data = sheet.sheetGetOne(id);
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
const createSheet = (req = request, res = response) => {
  try {
    const { id_project, title, nivel, is_query, id_query, is_plain, id_plain } = req.body;
    const objReg = { id_project, title };
    if (nivel) { objReg.nivel = nivel; }
    if (is_query) { objReg.is_query = is_query; }
    if (id_query) { objReg.id_query = id_query; }
    if (is_plain) { objReg.is_plain = is_plain; }
    if (id_plain) { objReg.id_plain = id_plain; }
    const sheet = new Sheet();
    const data = sheet.customerCreate(objReg);
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
const updateSheet = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { id_project, title, nivel, is_query, id_query, is_plain, id_plain } = req.body;
    const objReg = { id_project, title, id };
    if (nivel) { objReg.nivel = nivel; }
    if (is_query) { objReg.is_query = is_query; }
    if (id_query) { objReg.id_query = id_query; }
    if (is_plain) { objReg.is_plain = is_plain; }
    if (id_plain) { objReg.id_plain = id_plain; }
    const sheet = new Sheet();
    const data = sheet.sheetUpdate(objReg);
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
const deleteSheet = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const sheet = new Sheet();
    const data = sheet.sheetDelete(id);
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

module.exports = { getSheets, getSheet, createSheet, updateSheet, deleteSheet }
