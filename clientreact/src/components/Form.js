import React, { useEffect, useState } from 'react';
import Gif from '../components/Gif';
import getmaestroRadioBases from '../services/getmaestroRadioBases';
//import LogLogRegistroRadioBases from "./LogRegistroRadioBases";

export default function Form({ params }) {
  //const {keyword} = params 
  //console.log("keyword",keyword)
  const [maestroRadioBases, setRadioBases] = useState([])
  useEffect(function () {
    getmaestroRadioBases()
      .then(maestroRadioBases => setRadioBases(maestroRadioBases))
    //El segundo parametro de la funcion ahorita indica que solo se ejecutara 1 vez (arreglo vacio) sin ese paremtro se ejecutaria cada vez que se renderiza el componente OJO Loop Infinito
    //En este caso se coloco keyword como dependencia del efecto entonces cada q cambie la keyword se redenerizara de nuevo
  }, [])
  //formas de llama componente
  return (

    <select>
      {
      maestroRadioBases.map(({ id }) =>
        <Gif
          id={id}
          key={id} />
      )}
    </select>
  )

}