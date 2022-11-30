import {collection, getDocs, query, doc, deleteDoc, where, onSnapshot,} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import  { db } from "./Componentes/firebase";
import AppForm from "./Componentes/AppForm";
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
    ////////////////////////Definir lectura/////////////////////////
       ////PARA actuañizar y eliminar
    const [docsBD, setDocsBD] = useState([]);        ////PARA LECTURA A BD
    const [orden, setOden] = useState(0);
    const i = 1; 

    //////////////LECTURA A BD/////////////////////////////////
    const fnRead = async () =>{
      try {
        const xColeccionConQuery = query(collection(db, "favoritos"));
        //const xColeccionConQuery = query(collection(db, "favoritos"), where ("URL","!=", ""));
        const unsubscribe = onSnapshot(xColeccionConQuery, (xDatosBD) =>{
        const xDoc = [];
        xDatosBD.forEach((doc) => {
          xDoc.push({id: doc.id, ...doc.data()});
        });
        setDocsBD(xDoc);
      });
      } catch (error) {
        
      }
    }
    fnRead();
    
    const [idActual, setIdActual] = useState("");

    /*useEffect( () => {
      fnRead();
    }, [idActual]); */

    //////////////ELIMINAR/////////////////////////////////
    const fnDelete = async (xId) =>{
      if (window.confirm("Esta seguro que desea eliminar")) {
        await deleteDoc(doc(db, 'favoritos', xId));
        toast("Documento eliminado con éxito",{
          type:'error',
          autoClose: 2000
        })
      }
      //fnRead();

    }


      return (
        <div className="container text-center">
          <div className="card bs-secondary p-3 mt-3">

            <ToastContainer />

          <div className="card border-danger mb-3">
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
                    onClick={() => fnDelete(p.id)}>close</i>

                    ----

                    <i className="material-icons text-warning"
                    onClick={() => setIdActual(p.id)}>create</i>
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

