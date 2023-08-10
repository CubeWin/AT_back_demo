const Conexion = require('../database');


class SheetDao extends Conexion {
    constructor() {
        super()
    }

    sheetAll() {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_sheet, id_project, title, nivel, is_query, id_query, is_plain, id_plain FROM SHEET");
            let res = stmt.exec();
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    sheetGetOne(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_sheet, id_project, title, nivel, is_query, id_query, is_plain, id_plain FROM SHEET WHERE id_sheet = ? LIMIT 1");
            let res = stmt.exec([id]);
            return res[0];
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    getSheetByProject(idProject) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_sheet, id_project, title, nivel, is_query, id_query, is_plain, id_plain FROM SHEET WHERE id_project = ?");
            let res = stmt.exec([idProject]);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    sheetDelete(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("DELETE FROM SHEET WHERE id_sheet =  ?");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    sheetCreate(sheet) {
        try {
            let columnName = 'ID_SHEET, ID_PROJECT, TITLE';
            let columnValues = '?, ?, ?'
            let arrValues = [sheet.id_sheet, sheet.id_project, sheet.title]

            if (sheet.nivel) {
                columnName += ', NIVEL';
                columnValues += ', ?'
                arrValues.push(sheet.nivel)
            }
            if (sheet.is_query) {
                columnName += ', IS_QUERY';
                columnValues += ', ?'
                arrValues.push(sheet.is_query)
            }
            if (sheet.id_query) {
                columnName += ', ID_QUERY';
                columnValues += ', ?'
                arrValues.push(sheet.id_query)
            }
            if (sheet.is_plain) {
                columnName += ', IS_PLAIN';
                columnValues += ', ?'
                arrValues.push(sheet.is_plain)
            }
            if (sheet.id_plain) {
                columnName += ', ID_PLAIN';
                columnValues += ', ?'
                arrValues.push(sheet.id_plain)
            }


            let sqlQuery = `INSERT INTO SHEET (${columnName}) VALUES (${columnValues})`;
            console.log(sqlQuery);
            console.log(arrValues);
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

    sheetUpdate(sheet) {
        try {
            let columnName = 'ID_PROJECT = ?, TITLE = ?';
            let arrValues = [sheet.id_project, sheet.title]

            if (sheet.nivel) {
                columnName += ', NIVEL = ?';
                arrValues.push(sheet.nivel)
            }
            if (sheet.is_query) {
                columnName += ', IS_QUERY = ?';
                arrValues.push(sheet.is_query)
            }
            if (sheet.id_query) {
                columnName += ', ID_QUERY = ?';
                arrValues.push(sheet.id_query)
            }
            if (sheet.is_plain) {
                columnName += ', IS_PLAIN = ?';
                arrValues.push(sheet.is_plain)
            }
            if (sheet.id_plain) {
                columnName += ', ID_PLAIN = ?';
                arrValues.push(sheet.id_plain)
            }

            arrValues.push(sheet.id)
            let sqlQuery = `UPDATE SHEET SET ${columnName} WHERE id_sheet = ?`;

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

module.exports = SheetDao;
