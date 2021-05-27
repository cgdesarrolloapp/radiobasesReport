const knex = require("./knex")

function getAllRadiobaseReports(){
    return knex('radiobasesDB').select('*').where('FECHA', '<', '2019-09-08')
    //return knex('radiobasesDB').select('*').where('RADIOBASE', '=', 'RB010017C101')
}

function getRadiobase(req, res){
    console.log("aaaaaaaaa",req.query)
    debugger
    //return knex('radiobasesDB').select('*').where('FECHA', '<', '2019-09-08')
    return knex('radiobasesDB').select('*').where('RADIOBASE', 'LIKE', req.query.RADIOBASE, 'AND', 'FECHA','LIKE', req.query.FECHA)
}

module.exports = {
    getAllRadiobaseReports,
    getRadiobase
}