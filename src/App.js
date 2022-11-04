import { useState } from "react";
import AppForm from "./Componentes/AppForm";


function App() {
////////////////////////Definir lectura/////////////////////////
const [idActual, setIdActual] = useState("");    ////PARA actuañizar y eliminar
const [docsBD, setDocsBD] = useState([]);        ////PARA LECTURA A BD

//////////////LECTURA A BD/////////////////////////////////
const fnRead = () =>{
  console.log("Lectura a BD");
}

//////////////ELIMINAR/////////////////////////////////
const fnDelete = () =>{
  console.log("Eliminar un registro");
}


  return (
    <div style={{background:"greenyellow", width:"350px"}}>
      <h1> sitiocopia (App.js)</h1>
      <AppForm {...{idActual, setIdActual, fnRead}}/>
    </div>
  );
}

export default App;
