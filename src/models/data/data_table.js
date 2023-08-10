const Conexion = require('../database');

class DataTableDao extends Conexion {
    constructor() {
        super()
    }

    dataTableAll() {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT * FROM DATA_TABLE");
            let res = stmt.exec();
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    dataTableGetOne(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT * FROM DATA_TABLE WHERE id_data_table =  ? LIMIT 1");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    dataTableDelete(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("DELETE FROM DATA_TABLE WHERE id_data_table =  ?");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    dataTableCreate(dataTable) {
        try {
            let columnName = 'id_data_table, table_name, description';
            let columnValues = '?, ?, ?'
            let arrValues = [dataTable.id_data_table, dataTable.table_name, dataTable.description]
            let sqlQuery = `INSERT INTO DATA_TABLE (${columnName}) VALUES (${columnValues})`;
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

    dataTableUpdate(dataTable) {
        try {
            let columnName = 'table_name = ?, description = ?';
            let arrValues = [dataTable.table_name, dataTable.description, dataTable.id_data_table]
            let sqlQuery = `UPDATE DATA_TABLE SET ${columnName} WHERE id_data_table = ?`;
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

module.exports = DataTableDao;
