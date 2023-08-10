const { request, response } = require('express')
const { v4: uuidv4 } = require('uuid');
const Usuario = require('../models/data/usuario')

const { genJWT, matchPassword, encryptPassword } = require('../common')

const jwt = require('jsonwebtoken')

const logIn = async (req = request, res = response) => {
  try {
    const { username, password } = req.body

    const usuario = new Usuario()
    const data = usuario.usuarioAuth(username)
    const isMatchPwd = await matchPassword(password, data.PASSWORD)
    if (!isMatchPwd) {
      throw new Error('Usuario o clave incorrecto.')
    }

    const token = await genJWT(data.USERNAME)
    const objResponse = {
      success: true,
      message: 'Success auhtentication',
      data,
      token
    }
    res.status(200).json(objResponse)
  } catch (error) {
    const objResponse = {
      success: false,
      message: 'fallo en la autenticación',
      error_code: 0,
      data: {},
      error: error.message
    }
    res.status(500).json(objResponse)
  }
}

const authenticate = async (req = request, res = response) => {
  try {
    const token = req.header('auth-token')
    if (!token) {
      throw new Error('No se obtuvo el token.')
    }
    const verfify = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

    const objResponse = {
      success: true,
      message: 'Success auhtentication',
      data: {},
      token,
      verfify
    }

    res.status(200).json(objResponse)
  } catch (error) {
    const objResponse = {
      success: false,
      message: 'fallo en la autenticación',
      error_code: 0,
      data: {},
      error: error.message
    }
    res.status(500).json(objResponse)
  }
}

const createUser = async (req = request, res = response) => {
  try {
    console.log('=> createUser');
    const { username, password } = req.body
    const { isEncrypt, pwdHash } = await encryptPassword(password)
    console.log(`=> ${isEncrypt} ${pwdHash}`);
    if (!isEncrypt) {
      throw new Error('la clave debe terner 4 digitos como minimo.')
    }

    const usuario = new Usuario()
    const data = usuario.usuarioCreate(username, pwdHash)
    if (!data || data.error) {
      throw new Error(`no se pudo registrar el usuario en la BD.`)
    }

    const objResponse = {
      success: true,
      message: 'Se registro correctamente.',
      data: {
        request: data
      }
    }

    res.status(200).json(objResponse)
  } catch (error) {
    console.log(error);
    const objResponse = {
      success: false,
      message: 'Fallo en la creación.',
      error_code: 0,
      data: {},
      error: error.message
    }
    res.status(500).json(objResponse)
  }
}

module.exports = { logIn, authenticate, createUser }
