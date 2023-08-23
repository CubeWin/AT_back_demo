const { response } = require("express");
const CommandQueryDao = require("../models/data/commandQuery");
const QueryDao = require("../models/data/query");
const SheetDao = require("../models/data/sheet");
const QueryFieldDao = require("../models/data/queryField");

const projectQuery = (req = request, res = response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const sheet = new SheetDao()
    const resGetByProject = sheet.getSheetByProject(id)
    console.log('resGetByProject =>', resGetByProject);
    if (resGetByProject.length <= 0 || (!resGetByProject.IS_QUERY && !resGetByProject.IS_PLAIN)) {
      const objResponse3 = {
        success: true,
        message: 'Data Obtenida',
        data: {
          sheet: resGetByProject[0].ID_SHEET || null,
          name: [],
          fields: [],
          request: [],
        },
      }

      res.status(200).json(objResponse3);
      return
    }
    const { ID_QUERY } = resGetByProject[0]
    console.log(ID_QUERY);
    const query = new QueryDao()
    const { NAME, SENTENCE } = query.queryGetOne(ID_QUERY)
    console.log('Sentencia -> ', SENTENCE);
    if (!SENTENCE) throw new Error('No hay sentencia')
    const commandQuery = new CommandQueryDao()
    const data = commandQuery.execQuery(SENTENCE);
    console.log('data', data);
    const queryField = new QueryFieldDao()
    const resQueryField = queryField.queryFieldGetOne(ID_QUERY)
    console.log('resQueryField=>', resQueryField);
    const fieldsName = resQueryField.filter(field => field.IS_ACTIVE).map(field => field.FIELD_NAME)
    const objResponse = {
      success: true,
      message: 'Data Obtenida',
      data: {
        name: NAME,
        fields: fieldsName,
        request: data,
      },
    }
    res.status(200).json(objResponse);
  } catch (error) {
    console.log('error ->', error);
    const objResponse = {
      success: false,
      message: error.message,
      error_code: 1306,
      data: {},
      error,
    }
    res.status(200).json(objResponse);
  }
}



module.exports = { projectQuery }
