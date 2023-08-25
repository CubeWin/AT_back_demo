const Conexion = require('../database');

class ProjectDao extends Conexion {
    constructor() {
        super()
    }

    projectAll() {
        try {
            this.connect();
            // let stmt = this.dbConnection.prepare("SELECT P.id_project, P.name, P.description, TO_VARCHAR(P.date_create, 'DD/MM/YYYY') AS DATE_CREATE, P.user_create, S.IS_QUERY, S.IS_PLAIN, STRING_AGG(DT.table_name, ',') AS Tables FROM PROJECT P INNER JOIN SHEET S ON P.id_project = S.id_project LEFT JOIN QUERY Q ON S.id_query = Q.id_query LEFT JOIN DATA_TABLE DT ON Q.id_data_table = DT.id_data_table GROUP BY P.id_project, P.name, P.description, P.date_create, P.user_create, S.IS_QUERY, S.IS_PLAIN;");
            let stmt = this.dbConnection.prepare("SELECT DISTINCT  P.id_project, P.name, P.description, TO_VARCHAR(P.date_create, 'DD/MM/YYYY') AS DATE_CREATE, P.user_create FROM PROJECT P INNER JOIN SHEET S ON P.id_project = S.id_project;");

            let res = stmt.exec();
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    projectGetOne(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_project, name, description FROM PROJECT WHERE id_project = ? LIMIT 1");
            let res = stmt.exec([id]);
            return res[0];
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    projectDelete(id) {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("DELETE FROM PROJECT WHERE id_project =  ?");
            let res = stmt.exec([id]);
            console.log(res);
            return res;
        } catch (error) {
            return error;
        } finally {
            this.disconnect();
        }
    }

    projectCreate(project) {
        try {
            let columnName = 'ID_PROJECT, NAME, DESCRIPTION';
            let columnValues = '?, ?, ?'
            let arrValues = [project.id_project, project.name, project.description]
            let sqlQuery = `INSERT INTO PROJECT (${columnName}) VALUES (${columnValues})`;

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

    projectUpdate(project) {
        try {
            let columnName = 'NAME = ?, DESCRIPTION = ?';
            let arrValues = [project.name, project.description]
            /** add another data */
            arrValues.push(project.id)
            let sqlQuery = `UPDATE PROJECT SET ${columnName} WHERE ID_PROJECT = ?`;

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

module.exports = ProjectDao;
