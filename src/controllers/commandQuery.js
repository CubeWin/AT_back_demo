const { response } = require("express");
const CommandQueryDao = require("../models/data/commandQuery");
const QueryDao = require("../models/data/query");
const SheetDao = require("../models/data/sheet");
const QueryFieldDao = require("../models/data/queryField");
const PlainDao = require("../models/data/plain");

const projectQuery = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const sheet = new SheetDao()
    const resGetSheetsByProjectID = sheet.getSheetByProject(id)
    if (resGetSheetsByProjectID.length <= 0) {
      const objResponse = {
        success: true,
        message: 'Data Obtenida',
        data: [{
          sheet: null,
          name: '',
          fields: [],
          request: [],
          is_query: false,
          id_query: null,
          is_plain: false,
          id_plain: null
        }],
      }
      res.status(200).json(objResponse);
      return
    }

    const arrData = resGetSheetsByProjectID.map((sheet) => {
      if ((!sheet.IS_QUERY && !sheet.IS_PLAIN)) {
        return {
          sheet: sheet.ID_SHEET,
          name: sheet.TITLE,
          fields: [],
          request: [],
          is_query: false,
          id_query: null,
          is_plain: false,
          id_plain: null
        }
      }
      const { ID_QUERY, ID_PLAIN } = sheet

      if (!!ID_QUERY) {
        const query = new QueryDao()
        const { SENTENCE } = query.queryGetOne(ID_QUERY)
        if (!SENTENCE) throw new Error('No hay sentencia')

        const commandQuery = new CommandQueryDao()
        const data = commandQuery.execQuery(SENTENCE);

        const queryField = new QueryFieldDao()
        const resQueryField = queryField.queryFieldGetOne(ID_QUERY)
        const fieldsName = resQueryField.filter(field => field.IS_ACTIVE).map(field => field.FIELD_NAME)

        return {
          sheet: sheet.ID_SHEET || null,
          name: sheet.TITLE,
          fields: fieldsName,
          request: data || [],
          is_query: true,
          id_query: ID_QUERY,
          is_plain: false,
          id_plain: null
        }
      } else if (!!ID_PLAIN) {
        const plain = new PlainDao()
        console.log('ID_PLAIN =>', ID_PLAIN);
        const resPlain = plain.plainGetOne(ID_PLAIN)
        console.log('resPlain =>', resPlain);
        const { FULL_TEXT } = resPlain
        return {
          sheet: sheet.ID_SHEET || null,
          name: sheet.TITLE,
          fields: [],
          request: JSON.parse(FULL_TEXT) || [],
          is_query: false,
          id_query: null,
          is_plain: true,
          id_plain: ID_PLAIN
        }
      }

    });

    const objResponse = {
      success: true,
      message: 'Data Obtenida',
      data: arrData,
    }
    res.status(200).json(objResponse);
  } catch (error) {
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
