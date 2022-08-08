import React, { useEffect, useState } from 'react';
import Gif from '../components/Gif';
import getmaestroRadioBases from '../services/getmaestroRadioBases';
import { useLocation } from "wouter";
import useForm from './hook';
//import LogLogRegistroRadioBases from "./LogRegistroRadioBases";

export default function Form({
  initialKeyword = ''
}) {
  //const {keyword} = params 
  //console.log("keyword",keyword)
  const [maestroRadioBases, setRadioBases] = useState([])
  useEffect(function () {
    getmaestroRadioBases()
      .then(maestroRadioBases => setRadioBases(maestroRadioBases))
    //El segundo parametro de la funcion ahorita indica que solo se ejecutara 1 vez (arreglo vacio) sin ese paremtro se ejecutaria cada vez que se renderiza el componente OJO Loop Infinito
    //En este caso se coloco keyword como dependencia del efecto entonces cada q cambie la keyword se redenerizara de nuevo
  }, [])

  const {keyword, changeKeyword} = useForm({ initialKeyword })

  const [_, pushLocation] = useLocation()

  const handleChange = (evt) => {
    changeKeyword({ keyword: evt.target.value })
  }

  const onSubmit = ({ keyword }) => {
    if (keyword !== '') {
      // navegar a otra ruta
      pushLocation(`/search/${keyword}`)
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    //debugger
    onSubmit({ keyword })
  }

  //formas de llama componente
  return (
    <form onSubmit={handleSubmit} >
    <select onChange={handleChange}> 
      {
      maestroRadioBases.map(({ id }) =>
        <Gif
          id={id}
          key={id} />
      )}
    </select>
    <button>consultar</button>
    </form>
  )

}