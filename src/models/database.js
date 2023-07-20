const hana = require("@sap/hana-client");

class Conexion {
    constructor() {
        this.dbConnection = hana.createConnection();
        const { SERVER_NODE, MY_USER, MY_PASSWORD } = process.env;
        this.connOptions = {
            serverNode: SERVER_NODE,
            encrypt: "true",
            sslValidateCertificate: "false",
            uid: MY_USER,
            pwd: MY_PASSWORD,
        };
    }

    connect() {
        try {
            this.dbConnection.connect(this.connOptions)
            console.log(`Base de datos conectado`);
        } catch (error) {
            throw new Error(error)
        }
    }

    disconnect() {
        this.dbConnection.disconnect();
        console.log(`Disconnect`);
    }
}

module.exports = Conexion;
