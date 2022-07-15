const express = require('express')
const db = require('./db/radiobasesReport')
var cors = require('cors')
const app = express()
//app.use(express.json)
const PORT = 5000
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//Obtiene registros con parametros Fecha y RADIOBASE
app.get('/reporteRadiobases', async (req, res) => {
    console.log("req",req)
    console.log("req query",req.query)
    debugger
    const results = await db.getRadiobase(req,res)
    console.log("results",results)
        res.status(200).json({results})    
})
//Obtiene todos los registros
app.get('/reporteRadiobasesAll', async (req, res) => {
    console.log("req",req)
    console.log("req query",req.query)
    debugger
    const results = await db.getAllRadiobaseReports()
    console.log("results",results)
        res.status(200).json({results})    
})
//Obtiene el maestro de radiobases
app.get('/maestroRadiobases', async (req, res) => {
  console.log("req",req)
  console.log("req query",req.query)
  debugger
  const results = await db.getMaestroRadiobase(req,res)
  console.log("results",results)
      res.status(200).json({results})    
})

app.listen(
    PORT,
    () => console.log('Servidor activo en puerto '+PORT.toString())
)