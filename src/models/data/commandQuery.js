const Conexion = require('../database');

class CommandQueryDao extends Conexion {

  constructor() {
    super()
  }

  execQuery(sqlQuery) {
    try {
      this.connect();
      let stmt = this.dbConnection.prepare(sqlQuery);
      let res = stmt.exec();
      console.log(res);
      return res;
    } catch (error) {
      return error;
    } finally {
      this.disconnect();
    }
  }
}

module.exports = CommandQueryDao;