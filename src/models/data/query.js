const Conexion = require('../database');

class QueryDao extends Conexion {
    constructor() {
        super()
    }

    queryAll() {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_query, id_data_table, name, sentence FROM QUERY");
            let res = stmt.exec();
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            this.disconnect();
        }
    }

    queryGetOne(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_query, id_data_table, name, sentence FROM QUERY WHERE id_query = ? LIMIT 1");
            let res = stmt.exec([id]);
            console.log(res[0]);
            return res[0];
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    queryDelete(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("DELETE FROM QUERY WHERE id_query =  ?");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    queryCreate(query) {
        try {
            let columnName = 'ID_QUERY, ID_DATA_TABLE';
            let columnValues = '?, ?'
            let arrValues = [query.id_query, query.id_data_table]

            if (query.sentence) {
                columnName += ', SENTENCE';
                columnValues += ', ?'
                arrValues.push(query.sentence)
            }

            if (query.name) {
                columnName += ', NAME';
                columnValues += ', ?'
                arrValues.push(query.name)
            }

            let sqlQuery = `INSERT INTO QUERY (${columnName}) VALUES (${columnValues})`;
            console.log(sqlQuery);
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

    queryUpdate(query) {
        try {
            let columnName = 'ID_DATA_TABLE = ?, SENTENCE = ?';
            let arrValues = [query.id_data_table, query.sentence]

            if (query.name) {
                columnName += ', NAME = ?';
                arrValues.push(query.name)
            }

            arrValues.push(query.id)
            let sqlQuery = `UPDATE QUERY SET ${columnName} WHERE id_query = ?`;

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

module.exports = QueryDao;
