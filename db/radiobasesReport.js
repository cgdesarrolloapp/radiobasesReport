const knex = require("./knex")

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

function getRadiobase(req, res){
    console.log("aaaaaaaaa",req.query)
    return knex('radiobasesDB').select('*').where('RADIOBASE', 'LIKE', req.query.RADIOBASE, 'AND', 'FECHA','LIKE', req.query.FECHA)
}

module.exports = {
    getAllRadiobaseReports,
    getMaestroRadiobase,
    getRadiobase
}