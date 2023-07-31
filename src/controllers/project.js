const { request, response } = require('express')
const Project = require('../models/data/project')

const getProjects = (req = request, res = response) => {
  try {
    const { skip = 0, limit = 5 } = req.query
    const project = new Project()
    const data = project.projectAll()
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
const getProject = (req = request, res = response) => {
  try {
      const { id } = req.params;
      const project = new Project();
      const data = project.projectGetOne(id);
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
const createProject = (req = request, res = response) => {
  try {
      const { name, description } = req.body;
      const objReg = { name, description };
      const project = new Project();
      const data = project.projectCreate(objReg);
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
const updateProject = (req = request, res = response) => {
  try {
      const { id } = req.params;
      const {name, description } = req.body;
      const objReg = { name, description, id };
      const project = new Project();
      const data = project.projectUpdate(objReg);
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
const deleteProject = (req = request, res = response) => {
  try {
      const { id } = req.params;
      const project = new Project();
      const data = project.projectDelete(id);
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

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject }
