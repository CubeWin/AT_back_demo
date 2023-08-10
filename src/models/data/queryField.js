const Conexion = require('../database');

class QueryFieldDao extends Conexion {
    constructor() {
        super()
    }

    queryFieldAll() {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_query_field, id_query, field_name, is_active FROM QUERY_FIELD");
            let res = stmt.exec();
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    queryFieldGetOne(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_query_field, id_query, field_name, is_active FROM QUERY_FIELD WHERE id_query = ?");
            let res = stmt.exec([id]);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    queryFieldDelete(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("DELETE FROM QUERY_FIELD WHERE id_query_field =  ?");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    queryFieldCreate(queryField) {
        try {
            let columnName = 'ID_QUERY_FIELD, ID_QUERY, FIELD_NAME, IS_ACTIVE';
            let columnValues = '?, ?, ?, ?'
            let arrValues = [queryField.id_query_field, queryField.id_query, queryField.field_name, queryField.is_active]

            let sqlQueryField = `INSERT INTO QUERY_FIELD (${columnName}) VALUES (${columnValues})`;
            console.log(sqlQueryField);
            console.log(arrValues);
            this.connect();
            let stmt = this.dbConnection.prepare(sqlQueryField);
            let res = stmt.exec(arrValues);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    queryFieldUpdate(queryField) {
        try {
            let columnName = 'ID_QUERY = ?, FIELD_NAME = ?, IS_ACTIVE = ?';
            let arrValues = [queryField.id_query, queryField.field_name, queryField.is_active]

            arrValues.push(queryField.id)
            let sqlQueryField = `UPDATE QUERY_FIELD SET ${columnName} WHERE id_query_field = ?`;

            this.connect();
            let stmt = this.dbConnection.prepare(sqlQueryField);
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

module.exports = QueryFieldDao;
