import React, { useEffect, useState } from 'react';
import Row from './Row';
import Header from './Header';
import getRadioBasesLog from '../services/getRadioBasesLog';
import style from './style.css'

export default function Tabla(radiobase1) {
  debugger
  var radiobase = radiobase1.params.keyword
  console.log("radiobase", radiobase)
  // const { radiobase } = params
  // console.log("radiobase", radiobase)

  const [maestroRadioBases, setRadioBases] = useState([])

  useEffect(function () {
    getRadioBasesLog(radiobase)
      .then(maestroRadioBases => {
        return setRadioBases(maestroRadioBases)
      })
    //El segundo parametro de la funcion ahorita indica que solo se ejecutara 1 vez (arreglo vacio) sin ese paremtro se ejecutaria cada vez que se renderiza el componente OJO Loop Infinito
    //En este caso se coloco keyword como dependencia del efecto entonces cada q cambie la keyword se redenerizara de nuevo
  }, [radiobase])
  //formas de llama componente
  var cont = 0
  console.log("maestroRadioBases", maestroRadioBases)
  return (

    <table>
      <thead>
      <tr>
          {
            maestroRadioBases.map(header => {
              cont = cont + 1
              if (cont == 1) {
                console.log("header.cabecera", header.cabecera)
                return header.cabecera.map(element => <Header key={element.titulo} titulo={element.titulo} />)
              }
            })
          }
        </tr>
      </thead>
      <tbody>
 
 
        {
          //maestroRadioBases.map(({ id, key, fecha }) =>
          maestroRadioBases.map(singleGif => <Row key={singleGif.id}{...singleGif} />)
            /*<Row
              id={id}
              key={id}
              fecha={fecha}
              value={key}
            />
          )*/
        }
      </tbody>
    </table>

  )

}