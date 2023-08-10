const Conexion = require('../database');

class DataFieldDao extends Conexion {
    constructor() {
        super()
    }

    dataFieldAll() {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT * FROM DATA_FIELD");
            let res = stmt.exec();
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    dataFieldGetOne(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT * FROM DATA_FIELD WHERE id_data_table =  ?");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    dataFieldDelete(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("DELETE FROM DATA_FIELD WHERE id_data_field =  ?");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    dataFieldCreate(dataField) {
        try {
            let columnName = 'id_data_field, id_data_table, field_name';
            let columnValues = '?, ?, ?'
            let arrValues = [dataField.id_data_field,  dataField.id_data_table, dataField.field_name]
            let sqlQuery = `INSERT INTO DATA_FIELD (${columnName}) VALUES (${columnValues})`;

            this.connect();
            let stmt = this.dbConnection.prepare(sqlQuery);
            let res = stmt.exec(arrValues);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    dataFieldUpdate(dataField) {
        try {
            let columnName = 'field_name = ?';
            let arrValues = [dataField.field_name]
            arrValues.push(dataField.id_data_field)
            let sqlQuery = `UPDATE DATA_FIELD SET ${columnName} WHERE id_data_field = ?`;

            this.connect();
            let stmt = this.dbConnection.prepare(sqlQuery);
            let res = stmt.exec(arrValues);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }
}

module.exports = DataFieldDao;
