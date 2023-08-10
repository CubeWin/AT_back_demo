const Conexion = require('../database');

class CustomerDao extends Conexion {
    constructor() {
        super()
    }

    customerAll() {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT * FROM ZCUSTOMER LIMIT 10 OFFSET 10");
            let res = stmt.exec();
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    customerGetOne(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT * FROM ZCUSTOMER WHERE id_customer =  ? LIMIT 1");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    customerDelete(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("DELETE FROM ZCUSTOMER WHERE id_customer =  ?");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    customerCreate(customer) {
        try {
            let columnName = 'NAME, SURNAME, EMAIL';
            let columnValues = '?, ?, ?'
            let arrValues = [customer.name, customer.surname, customer.email]
            if (customer.telephone) {
                columnName += ', TELEPHONE';
                columnValues += ', ?'
                arrValues.push(customer.telephone)
            }
            let sqlQuery = `INSERT INTO ZCUSTOMER (${columnName}) VALUES (${columnValues})`;

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

    customerUpdate(customer) {
        try {
            let columnName = 'NAME = ?, SURNAME = ?, EMAIL = ?';
            let arrValues = [customer.name, customer.surname, customer.email]
            if (customer.telephone) {
                columnName += ', TELEPHONE = ?';
                arrValues.push(customer.telephone)
            }
            if (customer.image) {
                columnName += ', IMAGE = ?';
                arrValues.push(customer.image)
            }
            if (customer.state) {
                columnName += ', STATE = ?';
                arrValues.push(customer.state)
            }
            arrValues.push(customer.id)
            let sqlQuery = `UPDATE ZCUSTOMER SET ${columnName} WHERE ID_CUSTOMER = ?`;

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

module.exports = CustomerDao;
