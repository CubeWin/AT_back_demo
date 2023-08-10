const { Router } = require("express");

// controllers
const { projectQuery } = require('../controllers/commandQuery')
// middlewares

const commandRoute = Router();

commandRoute.get('/', (req, res) => { res.status(200).json({ message: 'command' }) });

commandRoute.get('/:id', projectQuery);


module.exports = commandRoute;