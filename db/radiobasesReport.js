const knex = require("./knex")
const moment = require("moment")

function getAllRadiobaseReports(){

    let fecha
    fecha = moment.utc(moment()).endOf('day').format('YYYY-MM-DD')
    var Dias = 30
    let fechaTo = moment(fecha).subtract(Dias, 'days').format('YYYY-MM-DD')
    console.log(fecha +" getRadiobase - "+fechaTo)
    return knex('radiobasesDB').select('*').whereBetween('FECHA', [fechaTo, fecha])
}

function getMaestroRadiobase(req, res){
    console.log("bbbbb",req.query)
    return knex('radiobasesDB').distinct('RADIOBASE')
}

async function getRadiobase(req, res){
    let fecha, radiobase, region 
    req.query.RADIOBASE ? radiobase = req.query.RADIOBASE : radiobase = ''
    req.query.REGION ? region = req.query.REGION : region = ''
    req.query.FECHA ? fecha = moment.utc(req.query.FECHA).endOf('day').format('YYYY-MM-DD') : fecha = moment.utc(moment()).endOf('day').format('YYYY-MM-DD')
    var Dias = 30
    let fechaTo = moment(fecha).subtract(Dias, 'days').format('YYYY-MM-DD')
    console.log(fecha +" getRadiobase - "+fechaTo)
    if(radiobase || region) { 
        if(region) { 
            // return knex('radiobasesDB').select((knex.raw('distinct on ("RADIOBASE")').where('RADIOBASE', '=', radiobase, 'and', REGION, '=', region, ).whereBetween('FECHA', [fechaTo, fecha]) 
            return knex('radiobasesDB').select((knex.raw('distinct on ("RADIOBASE")').where( REGION, '=', region ).whereBetween('FECHA', [fechaTo, fecha]) 
        } else {
            return knex('radiobasesDB').select('*').where( RADIOBASE, '=', radiobase ).whereBetween('FECHA', [fechaTo, fecha]) 
        }
        
    } else { 
        if(radiobase && region) {
            return knex('radiobasesDB').select('*').where( RADIOBASE, '=', region, 'OR', REGION, '=', region ).whereBetween('FECHA', [fechaTo, fecha]) 
         }else{
            return knex('radiobasesDB').select((knex.raw('distinct on ("RADIOBASE")').whereBetween('FECHA', [fechaTo, fecha])
        }
        
    }

}

module.exports = {
    getAllRadiobaseReports,
    getMaestroRadiobase,
    getRadiobase
}