import {collection, doc, getDocs, addDoc, updateDoc} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import firebase,{db} from "./firebase";



const AppForm = (props) => {

    const camposRegistro = {URL:'', nombre:'', descripcion:''}
    const [objeto, setObjeto] = useState(camposRegistro);

    const controlarEstadoCambio = (e) => {
        const{URL, value} = e.target;
        setObjeto({...objeto, [URL]:value })

    }

    const controlSubmit = async (e) => {
        e.preventDefault();

        if(props.idActual === ""){
            if (validarForm) {
              addDoc(collection(db, 'favoritos'), objeto);
              console.log("Se guardo...");
              props.fnRead();
            }else{
              console.log("No se guardo...");
            }
        }else{
            await updateDoc(doc(collection(db, "favoritos"), props.idActual),objeto);
            console.log("Se actualizo...");
            props.fnRead();
            props.setIdActual('');
        }
        setObjeto(camposRegistro);
    }

    const validarForm = () => {
        if (objeto.URL==="" || /^\s+$/.test(objeto.URL)) {
            alert("Escriba URL...");
            return false;
        }
        return true;
    };

    useEffect( () => {
        if (props.idActual === "") {
          setObjeto({...camposRegistro});
        } else {
          obtenerDatosPorId(props.idActual);
        }
        props.fnRead();
    }, [props.idActual]);

    const obtenerDatosPorId = async(xId) => {
        const objPorId = doc(db, "favoritos", xId);
        const docPorId = await getDocs(objPorId);
        if (docPorId.exists()) {
          setObjeto(docPorId.data());
        } else {
          console.log("No hay doc...");
        }
    };

      return (
        <div style ={{background:"orange", padding:"10px", textAlign:"center"}}>
            <h1>AppForm.js </h1>
            <form onSubmit={controlSubmit}>
              <input type="text" name="URL" placeholder="URL.." onChange={controlarEstadoCambio}
              value={objeto.nombre}/> <br/>

              <input type="text" name="nombre" placeholder="Nombre.." onChange={controlarEstadoCambio}
              value={objeto.edad}/> <br/>

              <input type="text" name="descripcion" placeholder="Descripcion.." onChange={controlarEstadoCambio}
              value={objeto.genero}/> <br/>

              <button>
                {props.idActual === ""? "Guardar" : "Actualizar"}
              </button>

            </form>
        </div>
      )
}

export default AppForm