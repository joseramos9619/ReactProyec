import React, { useState, useEffect, useRef } from "react";
import Header from "./componetes/Header";
import Navbar from "./componetes/Navbar";
import Opciones from "./componetes/Opciones";
import Tabla from "./componetes/Tabla";

var lista = [];
function App() {
  const [cargado, setCargado] = useState(false);
  const [mostrar, setMostrar] = useState(5);
  const [filtro, setFiltro] = useState("1");
  const [lis, setlis] = useState([]);
  const [vista, setVista] = useState("1");

  let cant = useRef(null);
  let fil = useRef(null);

  useEffect(() => {
    listaProc();
  }, []);

  function captura() {
    setVista("1");
  }
  function simulador() {
    setVista("2");
  }

  function opteCant() {
    setMostrar(cant.current.value);
  }
  function opteFil() {
    setFiltro(fil.current.value);
  }

  function ordTabla() {
    if (filtro === "1") {
      lista.sort(function (a, b) {
        if (a.Memoria < b.Memoria) {
          return 1;
        }
        if (a.Memoria > b.Memoria) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    } else if (filtro === "2") {
      lista.sort(function (a, b) {
        if (a.TiempoCpu < b.TimeCpu) {
          return 1;
        }
        if (a.TimeCpu > b.TimeCpu) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }
    setlis(lista);
  }

  function listaProc() {
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
          let Usuario = text[6]
            .replace(/"/g, "")
            .replace(/{/g, "")
            .replace(`NT AUTHORITY\\\\`, "");
          let TiempoCpu = text[7].replace(/"/g, "").replace(/{/g, "");
          let Prior = 0;

          if (Usuario === "SYSTEM" || Usuario === "N\\/D") {
            Prior = 1;
          }

          lista.push({
            nombre: Nombre,
            PID: PID,
            NomSeai: NombSesi,
            NumSesi: Numsesi,
            Memoria: Memoria,
            Estado: Nombre,
            User: Usuario,
            TimeCpu: TiempoCpu,
            Prioridad: Prior,
          });
          i++;
        }
        ordTabla();
        setCargado(true);
      });
  }

  if (vista === "1") {
    return (
      <React.StrictMode>
        <Header />
        <Navbar captura={captura} simulador={simulador} act={["activa", ""]} />
        <Opciones
          cant={cant}
          fil={fil}
          opteCant={opteCant}
          opteFil={opteFil}
          ordTabla={ordTabla}
        />
        {cargado ? (
          <div className="tab">
            <Tabla lista={lis} cant={mostrar} />
          </div>
        ) : (
          <div>Cargando datos....</div>
        )}
      </React.StrictMode>
    );
  }
  if (vista === "2") {
    return (
      <React.StrictMode>
        <Header />
        <Navbar captura={captura} simulador={simulador} act={["", "activa"]} />
        <Opciones
          cant={cant}
          fil={fil}
          opteCant={opteCant}
          opteFil={opteFil}
          ordTabla={ordTabla}
        />
      </React.StrictMode>
    );
  }
}

export default App;
