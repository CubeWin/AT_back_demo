require("dotenv").config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

// const morgan = require("morgan");

// const Conexion = require('./models/database')

// const getAll = require('./models/data/customer');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 9090;

        this.middlewares();
        this.routes();
    }


    middlewares() {
        // this.app.use(morgan('combined'))
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                "Accept, Authorization, Origin, Content-Type, X-Requested-With"
            );
            if (req.method === "OPTIONS") {
                res.header(
                    "Access-Control-Allow-Methods",
                    "PUT, POST, PATH, DELETE, GET"
                );
                return res.status(200).json({});
            }
            next();
        });
    }

    routes() {
        this.app.use(require("./routes"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(
                `Servidor en el puerto ${this.port}. \n http://localhost:${this.port}`
            );
        });
    }
}

module.exports = Server;
