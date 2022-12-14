import {collection, doc, getDoc, addDoc, updateDoc} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {db} from "./firebase";



const AppForm = (props) => {

    const camposRegistro = {URL:'', nombre:'', descripcion:''}
    const [objeto, setObjeto] = useState(camposRegistro);

    const controlarEstadoCambio = (e) => {
        const{name, value} = e.target;
        setObjeto({...objeto, [name]:value })

    }

    const controlSubmit = async (e) => {
        try {
          e.preventDefault();

        if(props.idActual === ""){
            if (validarForm) {
              addDoc(collection(db, 'favoritos'), objeto);
              console.log("Se guardo...");
            }else{
              console.log("No se guardo...");
            }
        }else{
            await updateDoc(doc(collection(db, "favoritos"), props.idActual),objeto);
            toast("Se actualizo con éxito...", {
              type:'info',
              autoClose: 2000
            })
            props.setIdActual('');
        }
        setObjeto(camposRegistro);
        } catch (error) {
          console.error();
        }
    };

    const validarForm = () => {
        if (objeto.URL==="" || /^\s+$/.test(objeto.URL)) {
            alert("Escriba URL...");
            return false;
        }
        if (objeto.nombre==="" || /^\s+$/.test(objeto.nombre)) {
          alert("Escriba nombre...");
          return false;
      }
      if (objeto.descripcion==="" || /^\s+$/.test(objeto.descripcion)) {
        alert("Escriba descripcion...");
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
    }, [props.idActual]);

    const obtenerDatosPorId = async(xId) => {
        const objPorId = doc(db, "favoritos", xId);
        const docPorId = await getDoc(objPorId);
        if (docPorId.exists()) {
          setObjeto(docPorId.data());
        } else {
          console.log("No hay datos en BD...");
        }
    };

      return (
        <div >
            <form className="card card-body"onSubmit={controlSubmit}>
              <button className="btn btn-danger">
                 Formulario (AppForm.js)
              </button>
              <div className="form-group input-group">
                <div className="input-group-text bd-light">
                  <i className="material-icons">group_add</i>
                </div>
                  <input type="text" className="form-control" name="URL" placeholder="URL.." 
                  onChange={controlarEstadoCambio} value={objeto.URL}/> 
              </div>
              
              <div className="form-group input-group clearfix">
                <div className="input-group-text bd-light">
                  <i className="material-icons"> star_half</i>
                </div>
                  <input type="text" className="form-control" name="nombre" placeholder="Nombre.." 
                  onChange={controlarEstadoCambio} value={objeto.nombre}/> 
              </div>

              <div className="form-group input-group ">
                <div className="input-group-text bd-light">
                  <i className="material-icons"> insert_link</i>
                </div>
                  <input type="text" className="form-control" name="descripcion" placeholder="Descripcion.." 
                  onChange={controlarEstadoCambio} value={objeto.descripcion}/> 
              </div>
              
              <button className="btn btn-danger">
                {props.idActual === ""? "Guardar" : "Actualizar"}
              </button>

            </form>
        </div>
      )
}

export default AppForm