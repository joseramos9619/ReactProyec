import React, { useState, useEffect, useRef } from "react";
import Header from "./componetes/Header";
import Navbar from "./componetes/Navbar";
import Tabla from "./componetes/Tabla";

var lista = [];
function App() {
  const [cargado, setCargado] = useState(false);
  const [mostrar, setMostrar] = useState(5);
  const [filtro, setFiltro] = useState("1");
  const [lis,setlis] = useState([]);

  let cant = useRef(null);
  let fil = useRef(null);

  useEffect(() => {
    listaProc()
  },[]);

  function opteCant() {
    setMostrar(cant.current.value);
  }
  function opteFil() {
    setFiltro(fil.current.value);
  }

  function ordTabla() {
    if (filtro === "1") {
      lista.sort(function (a, b) {
        if (a.Memoria > b.Memoria) {
          return 1;
        }
        if (a.Memoria < b.Memoria) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    } 
    else if(filtro==="2") {
      lista.sort(function (a, b) {
        if (a.TiempoCpu > b.TimeCpu) {
          return 1;
        }
        if (a.TimeCpu < b.TimeCpu) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      
    }
    setlis(lista);
    cant.current.value=5;
  }

  function listaProc(){
    fetch("http://localhost/php/Procesos.php")
      .then((res) => res.json())
      .then((json) => {
        var i = 0;
        while (i < 131) {
          let text = json[i].split(",");
          let Nombre = text[0].replace(/"/g, "").replace(/{/g, "");
          let PID = text[1].replace(/"/g, "").replace(/{/g, "");
          let NombSesi = text[2].replace(/"/g, "").replace(/{/g, "");
          let Numsesi = text[3].replace(/"/g, "").replace(/{/g, "");
          let Memoria = text[4]
            .replace(/"/g, "")
            .replace(/{/g, "")
            .replace(/ KB/g, "");
          let Estado = text[5].replace(/"/g, "").replace(/{/g, "");
          let Usuario = text[6]
            .replace(/"/g, "")
            .replace(/{/g, "")
            .replace(/NT AUTHORITY\\/g, "");
          let TiempoCpu = text[7].replace(/"/g, "").replace(/{/g, "");
          let NomVent = text[8].replace(/"/g, "").replace(/}/g, "");
          lista.push({
            nombre: Nombre,
            PId: PID,
            NomSeai: NombSesi,
            NumSesi: Numsesi,
            Memoria: Memoria,
            Estado: Estado,
            User: Usuario,
            TimeCpu: TiempoCpu,
            Ventana: NomVent,
          });
          i++;
        }
        ordTabla()
        setCargado(true);
      });
  };
 
  return (

    <React.StrictMode>
      <Header />
      <Navbar />
      <div className="opciones">
        <div>
        <labe>Cantidad a Mostrar: </labe>
        <input
          type="number"
          defaultValue={5}
          ref={cant}
          min={1}
          max={131}
          onChange={opteCant}
        ></input>
        </div>
        <div>
        <labe>Filtrar Por: </labe>
        <select ref={fil} onChange={opteFil} onClick={ordTabla}>
          <option value={1}>Memoria</option>
          <option value={2}>Tiempo CPU</option>
        </select>
        </div>
      </div>
      <div className="tab">
      {cargado ? (
            <Tabla lista={lis} cant={mostrar}/>
      ) : (
        <div>Cargando datos....</div>
      )}
      </div>
    </React.StrictMode>
  );
}

export default App;
