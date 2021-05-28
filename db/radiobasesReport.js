const knex = require("./knex")
const moment = require("moment")

function getAllRadiobaseReports(){
    return knex('radiobasesDB').select('*').where('FECHA', '<', '2019-09-08')
    //return knex('radiobasesDB').select('*').where('RADIOBASE', '=', 'RB010017C101')
}

function getMaestroRadiobase(req, res){
    console.log("bbbbb",req.query)
    //return knex('radiobasesDB').select('*').where('RADIOBASE', 'LIKE', req.query.RADIOBASE, 'AND', 'FECHA','LIKE', req.query.FECHA)
    //return knex("const subcolumn = knex.raw('select avg(salary) from employee where dept_no = e.dept_no')")
    return knex('customers').distinct('RADIOBASE')
}

async function getRadiobase(req, res){
    console.log("getRadiobase ---",req.query)
    let fecha = moment.utc(req.query.FECHA).endOf('day').format()
    let fecha1 = moment(fecha).format('YYYY-MM-DD')
    console.log("getRadiobase --", fecha1)
    var Dias = 30
    let fechaTo = moment(fecha).subtract(Dias, 'days').format('YYYY-MM-DD')
    console.log(fecha1 +" getRadiobase - "+fechaTo)
    //return knex('radiobasesDB').select('*').where('RADIOBASE', 'LIKE', req.query.RADIOBASE, 'AND', 'FECHA','LIKE', fecha)
    return knex('radiobasesDB').select('*').where('RADIOBASE', 'LIKE', req.query.RADIOBASE).whereBetween('FECHA', [fechaTo, fecha1])
}

module.exports = {
    getAllRadiobaseReports,
    getMaestroRadiobase,
    getRadiobase
}