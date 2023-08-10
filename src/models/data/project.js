const Conexion = require('../database');

class ProjectDao extends Conexion {
    constructor() {
        super()
    }

    projectAll() {
        try {
            this.connect();
            let stmt = this.dbConnection.prepare("SELECT id_project, name, description FROM PROJECT");
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
