import React, { useState, useEffect } from "react";
import { StrictMode } from "react/cjs/react.production.min";

var lista = []

function Tabla() {

    const [cargado, setCargado] = useState(false);

    useEffect(() => {
        listaProc()
    }, []);

    const listaProc = () => {
        fetch('http://localhost/php/Procesos.php')
            .then((res) => res.json())
            .then((json) => {
                var i = 0
                while (i < 131) {
                    console.log(i)
                    let text = json[i].split(",");
                    let Nombre = text[0].replace(/"/g, "").replace(/{/g, "");
                    let PID = text[1].replace(/"/g, "").replace(/{/g, "");
                    let NombSesi = text[2].replace(/"/g, "").replace(/{/g, "");
                    let Numsesi = text[3].replace(/"/g, "").replace(/{/g, "");
                    let Memoria = text[4].replace(/"/g, "").replace(/{/g, "").replace(/ KB/g, "");
                    let Estado = text[5].replace(/"/g, "").replace(/{/g, "");
                    let Usuario = text[6].replace(/"/g, "").replace(/{/g, "").replace(/NT AUTHORITY\\/g, "");
                    let TiempoCpu = text[7].replace(/"/g, "").replace(/{/g, "");
                    let NomVent = text[8].replace(/"/g, "").replace(/}/g, "");
                    lista.push({
                        "nombre": Nombre,
                        "PId": PID,
                        "NomSeai": NombSesi,
                        "NumSesi": Numsesi,
                        "Memoria": Memoria,
                        "Estado": Estado,
                        "User": Usuario,
                        "TimeCpu": TiempoCpu,
                        "Ventana": NomVent
                    })
                    i++;
                }

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

                setCargado(true);

            })
    }

    return (
        <StrictMode>
            {
                cargado ?
                    <table>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Descriccion</th>
                            <th>Memoria</th>
                            <th>Tiempo CPU</th>
                        </tr>
                        <tbody>
                            {
                                lista.map((iten, i) => (
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>{iten.nombre}</td>
                                        <td>{iten.User}</td>
                                        <td>{iten.Estado}</td>
                                        <td>{iten.Memoria} KB</td>
                                        <td>{iten.TimeCpu}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>
                        Cargado Datos...
                    </div>
            }
        </StrictMode>
    );
}

export default Tabla;