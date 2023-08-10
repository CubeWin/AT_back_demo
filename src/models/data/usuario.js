const Conexion = require('../database')

class UsuarioDao extends Conexion {
  constructor() {
    super()
  }

  usuarioAll() {
    try {
      this.connect()
      let stmt = this.dbConnection.prepare(
        'SELECT * FROM USUARIO'
      )
      let res = stmt.exec()
      console.log(res)
      return res
    } catch (error) {
      return error
    } finally {
      this.disconnect()
    }
  }

  usuarioAuth(username) {
    try {
      this.connect()
      let stmt = this.dbConnection.prepare(
        'SELECT username, password FROM USUARIO WHERE username =  ? LIMIT 1'
      )
      let res = stmt.exec([username])
      return res[0]
    } catch (error) {
      return error
    } finally {
      this.disconnect()
    }
  }

  usuarioDelete(username) {
    try {
      this.connect()
      let stmt = this.dbConnection.prepare(
        'DELETE FROM USUARIO WHERE username =  ?'
      )
      let res = stmt.exec([username])
      console.log(res)
      return res
    } catch (error) {
      return error
    } finally {
      this.disconnect()
    }
  }

  usuarioCreate(username, password) {
    try {
      let columnName = 'USERNAME, PASSWORD'
      let columnValues = '?, ?'
      let arrValues = [username, password]
      let sqlQuery = `INSERT INTO USUARIO (${columnName}) VALUES (${columnValues})`
      this.connect()
      let stmt = this.dbConnection.prepare(sqlQuery)
      let res = stmt.exec(arrValues)
      return res
    } catch (error) {
      return {
        error: {
          message: error.message,
          code: error.code,
          sqlState: error.sqlState
        }
      }
    } finally {
      this.disconnect()
    }
  }

  // usuarioUpdate(customer) {
  //     try {
  //         let columnName = 'NAME = ?, SURNAME = ?, EMAIL = ?';
  //         let arrValues = [customer.name, customer.surname, customer.email]
  //         if (customer.telephone) {
  //             columnName += ', TELEPHONE = ?';
  //             arrValues.push(customer.telephone)
  //         }
  //         if (customer.image) {
  //             columnName += ', IMAGE = ?';
  //             arrValues.push(customer.image)
  //         }
  //         if (customer.state) {
  //             columnName += ', STATE = ?';
  //             arrValues.push(customer.state)
  //         }
  //         arrValues.push(customer.id)
  //         let sqlQuery = `UPDATE USUARIO SET ${columnName} WHERE ID_CUSTOMER = ${columnValues}`;

  //         this.connect();
  //         let stmt = this.dbConnection.prepare(sqlQuery);
  //         let res = stmt.exec(arrValues);
  //         console.log(res);
  //         return res;
  //     } catch (error) {
  //         return error;
  //     } finally {
  //         this.disconnect();
  //     }
  // }
}

module.exports = UsuarioDao
