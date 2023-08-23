const Conexion = require('../database');

class ReceiptDao extends Conexion {
  constructor() {
    super();
  }

  receiptAll() {
    try {
      this.connect();
      let stmt = this.dbConnection.prepare('SELECT * FROM receipt');
      let res = stmt.exec();
      return res;
    } catch (error) {
      return error;
    } finally {
      this.disconnect();
    }
  }

  receiptGetOne(id) {
    try {
      this.connect();
      let stmt = this.dbConnection.prepare('SELECT * FROM receipt WHERE id = ?');
      let res = stmt.exec([id]);
      return res[0];
    } catch (error) {
      return error;
    } finally {
      this.disconnect();
    }
  }

  receiptDelete(id) {
    try {
      this.connect();
      let stmt = this.dbConnection.prepare('DELETE FROM receipt WHERE id = ?');
      let res = stmt.exec([id]);
      return res;
    } catch (error) {
      return error;
    } finally {
      this.disconnect();
    }
  }

  receiptCreate(receipt) {
    try {
      let columnName = 'percent, totalNetoPay, totalPay, emisionFecha, customerPhone, descripcionPay, payCompany, payName, streetCompanyName, companyaRuc, companyName, streetName, dataRuc, invoiceId, issueDate, payableAmount, customerName, itemDescription';
      let columnValues = '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?';
      let arrValues = [
        receipt.percent,
        receipt.totalNetoPay,
        receipt.totalPay,
        receipt.emisionFecha,
        receipt.customerPhone,
        receipt.descripcionPay,
        receipt.payCompany,
        receipt.payName,
        receipt.streetCompanyName,
        receipt.companyaRuc,
        receipt.companyName,
        receipt.streetName,
        receipt.dataRuc,
        receipt.invoiceId,
        receipt.issueDate,
        receipt.payableAmount,
        receipt.customerName,
        receipt.itemDescription,
      ];

      let sqlQuery = `INSERT INTO receipt (${columnName}) VALUES (${columnValues})`;

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

  receiptUpdate(receipt) {
    try {
      let columnName = 'percent = ?, totalNetoPay = ?, totalPay = ?, emisionFecha = ?, customerPhone = ?, descripcionPay = ?, payCompany = ?, payName = ?, streetCompanyName = ?, companyaRuc = ?, companyName = ?, streetName = ?, dataRuc = ?, invoiceId = ?, issueDate = ?, payableAmount = ?, customerName = ?, itemDescription = ?';
      let arrValues = [
        receipt.percent,
        receipt.totalNetoPay,
        receipt.totalPay,
        receipt.emisionFecha,
        receipt.customerPhone,
        receipt.descripcionPay,
        receipt.payCompany,
        receipt.payName,
        receipt.streetCompanyName,
        receipt.companyaRuc,
        receipt.companyName,
        receipt.streetName,
        receipt.dataRuc,
        receipt.invoiceId,
        receipt.issueDate,
        receipt.payableAmount,
        receipt.customerName,
        receipt.itemDescription,
      ];

      let sqlQuery = `UPDATE receipt SET ${columnName} WHERE id = ?`;

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
}

module.exports = ReceiptDao;
