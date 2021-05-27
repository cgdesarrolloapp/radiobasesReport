const knex = require("./knex")

function getAllRadiobaseReports(){
    return knex('radiobasesDB').select('*').where('FECHA', '<', '2019-09-08')
    //return knex('radiobasesDB').select('*').where('RADIOBASE', '=', 'RB010017C101')
}

function getRadiobase(id){
    //return knex('radiobasesDB').select('*').where('FECHA', '<', '2019-09-08')
    return knex('radiobasesDB').select('*').where('RADIOBASE', '=', id)
}

module.exports = {
    getAllRadiobaseReports,
    getRadiobase
}