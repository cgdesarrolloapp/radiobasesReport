const express = require('express')
const db = require('./db/radiobasesReport')
var cors = require('cors')
const app = express()
//app.use(express.json)
const PORT = 5000
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())


app.get('/reporteRadiobases', async (req, res) => {
    console.log("req",req)
    console.log("req query",req.query)
    debugger
    const results = await db.getRadiobase(req,res)
    console.log("results",results)
        res.status(200).json({results})

        /*app.get("/employees/:id", (req, res, next) => {
            var params = [req.params.id]
            db.get(`SELECT * FROM employees where employee_id = ?`, [req.params.id], (err, row) => {
                if (err) {
                  res.status(400).json({"error":err.message});
                  return;
                }
                res.status(200).json(row);
              });
        });*/
        
}
)

app.listen(
    PORT,
    () => console.log('Servidor activo en puerto '+PORT.toString())
)