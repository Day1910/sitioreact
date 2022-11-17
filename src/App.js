import {collection, getDocs, query, doc, deleteDoc, where,} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import  { db } from "./Componentes/firebase";
import AppForm from "./Componentes/AppForm";



function App() {
    ////////////////////////Definir lectura/////////////////////////
    const [idActual, setIdActual] = useState("");    ////PARA actuañizar y eliminar
    const [docsBD, setDocsBD] = useState([]);        ////PARA LECTURA A BD
    const [orden, setOrden] = useState(0); 
    const i = 1; 

    //////////////LECTURA A BD/////////////////////////////////
    const fnRead = async () =>{
      const tblPersona = query(collection(db, "favoritos"), where ("URL","!=", ""));
      const xDatosBD = await getDocs(tblPersona);
      const xDoc = [];

      xDatosBD.forEach((doc) => {
        xDoc.push({id: doc.id, ...doc.data()});
      });
      setDocsBD(xDoc);
      //console.log("Lectura a BD");
    }

    useEffect( () => {
      fnRead();
    }, [idActual]);

    //////////////ELIMINAR/////////////////////////////////
    const fnDelete = async (xId) =>{
      if (window.corfirm("Confirme para eliminar")) {
        await deleteDoc(doc(db, 'favoritos', xId));
        console.log("Se elimino ...."+ xId);
      }
      fnRead();

    }


      return (
        <div className="container text-center">
          <div className="card bs-secondary p-3 mt-3">

          <div className="col-md-12 p-2">
            <div className="card mb-1">
              <h1> sitiocopia2 (App.js)</h1>
          </div>
        </div>
        
        <div className="col-md-12 p-2">
          <AppForm {...{idActual, setIdActual, fnRead}}/>
        </div>
          
        <div className="col-md-12 p-2"> 
          {
            docsBD.map( (p) =>
            <div className="card mb-1" key={p.id}>
              <div className="card-body"> 
                <div className="d-flex justify-content-between"> 
                  <h4>N.{i} - {p.URL}</h4>
                  <div>
                    <i className="material-icons text-danger"
                    onClick={() => fnDelete(p.id)}>Close</i>
                    ----
                    <i className="material-icons text-warning"
                    onClick={() => setIdActual(p.id)}>Cretae</i>
                  </div>
                </div> 
                <div className="d-flex justify-content">
                  <span>Nombre: {p.nombre}</span>...
                  <a href="#"> Descripcion: {p.descripcion}</a>
                </div> 
              </div>
            </div>
            )
          }
        </div> 
      </div>
    </div>
  );
}

export default App;
