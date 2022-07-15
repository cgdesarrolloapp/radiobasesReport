import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Tabla from './components/Tabla';
import getmaestroRadioBases from './services/getmaestroRadioBases';

function App() {
  return (
    <div className="App">
    <section className="App-content">
      <h1>App</h1>
      <Form />  
      <Tabla radiobase=''/>
      </section>
    </div>
  );

}

export default App;

