const { Router } = require("express");

// controllers
const {logIn, authenticate, createUser } = require("../controllers/auth");
// middlewares

const authRoute = Router();

authRoute.get('/', (req, res)=>{ res.status(200).json({message:'Bienvenido'})});

authRoute.post('/', logIn);

authRoute.post("/register", createUser);

authRoute.post("/validtoken", authenticate);

module.exports = authRoute;