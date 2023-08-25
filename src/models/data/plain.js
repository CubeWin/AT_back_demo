const Conexion = require('../database');

class PlainDao extends Conexion {
    constructor() {
        super()
    }

    plainAll() {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_plain, full_text FROM PLAIN");
            let res = stmt.exec();
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    plainGetOne(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_plain, full_text FROM PLAIN WHERE id_plain = ?");
            let res = stmt.exec([id]);
            return res[0];
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    plainDelete(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("DELETE FROM PLAIN WHERE id_plain =  ?");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    plainCreate(plain) {
        try {
            let columnName = 'ID_PLAIN, FULL_TEXT';
            let columnValues = '?, ?'
            let arrValues = [plain.id_plain, plain.full_text]

            let sqlQuery = `INSERT INTO PLAIN (${columnName}) VALUES (${columnValues})`;
            this.connect();
            let stmt = this.dbConnection.prepare(sqlQuery);
            let res = stmt.exec(arrValues);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    plainUpdate(plain) {
        try {
            let columnName = 'FULL_TEXT = ?';
            let arrValues = [plain.full_text]

            arrValues.push(plain.id)
            let sqlQuery = `UPDATE PLAIN SET ${columnName} WHERE id_plain = ?`;

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

module.exports = PlainDao;
