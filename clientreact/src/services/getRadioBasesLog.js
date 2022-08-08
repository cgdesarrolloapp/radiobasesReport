//const apiKey = 'j7Id1OsREtGQ58dSYf9z4bfNcAgl1b4J'
import moment from 'moment'

//parametro si no se manda es objeto vacio y si no sera mapache   
//export default function maestroRadioBases({keyword = 'mapache'} = {}){
export default function getRadioBasesLog(Logs = '') {
  //var that = this
  var aLogs = []
  var objLog = {}
  console.log("Logs", Logs)

  //var {keyword} = Logs

  //fetch no lo soportan todos los navegadores
  //template string `   
  //const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=10&offset=0&rating=g&lang=en`
  //const apiURL = `http://localhost:5000/reporteRadiobases?RADIOBASE=${id}&FECHA=2019-09-09`
  //const apiURL = Logs.radiobase === '' ? 'http://localhost:5000/reporteRadiobasesAll?RADIOBASE=RB010017C101&FECHA=2019-08-02' : `http://localhost:5000/reporteRadiobasesAll?RADIOBASE=${radiobase}&FECHA=2019-08-02`
  const apiURL = Logs === '' ? 'http://localhost:5000/reporteRadiobase/RB010017C101' : `http://localhost:5000/reporteRadiobase/${Logs}`
  return fetch(apiURL)
    .then(res => res.json())
    .then(response => {

      const { results = [] } = response

      var cabecera = [{ 'titulo': 'RadioBase' }]


      const uniqueRadioBase = [...new Set(results.map(item => item.RADIOBASE))];
      var uniqueFecha = [...new Set(results.map(item => item.FECHA))];

      const hoy = moment().utc()
      let fecha = moment.utc().endOf('day').format()
      let fecha1 = moment(fecha).format('YYYY-MM-DD')
      let rangoFecha = []

      cabecera.push({ "titulo": fecha1 })
      for (let index = 1; index < 30; index++) {
        var fechaMenos = moment(fecha).subtract(index, 'days').format('YYYY-MM-DD')
        cabecera.push({ "titulo": fechaMenos })
      }



      var Log1 = {}
      var Log = {}

      
      if (uniqueRadioBase.length == 0) {
        objLog = {
          'id': Logs,
          'cabecera': cabecera
        }
        cabecera.forEach(elementFecha => {
          var element = elementFecha.titulo
          var Trafico = "0"
          objLog[element] = Trafico
        })
        aLogs.push(objLog)

      }
      debugger
      uniqueRadioBase.forEach(elemento => {
        //console.log("elemento",elemento)
        objLog = {
          'id': elemento,
          'cabecera': cabecera
        }
        cabecera.forEach(elementFecha => {
          var element = elementFecha.titulo
          Log1 = results.filter(obj => obj.RADIOBASE === elemento)
          Log = Log1.find(obj => obj.FECHA === element)
          console.log("Log2", element)
          //console.log("Log2",Log.TRAFICO)
          var Trafico = Log ? Log.TRAFICO : "0"
          objLog[element] = Trafico
        })
        aLogs.push(objLog)
      })

      console.log(aLogs)

      return aLogs

    })
}