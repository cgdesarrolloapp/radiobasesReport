import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Tabla from './components/Tabla';
import { Link, Route, Switch } from "wouter";
import getmaestroRadioBases from './services/getmaestroRadioBases';

function App() {
  return (
    
    <div className="App">

      <Form />
      <Route
                  component={Tabla}
                  path="/search/:keyword?"
                />
      {/*<Tabla radiobase=''/>*/}
    
    </div>
  );

}

export default App;

