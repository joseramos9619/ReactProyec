import React, { useState, useEffect, useRef } from "react";
import { StrictMode } from "react/cjs/react.production.min";

var lista = []

function Tabla() {

    const [cargado, setCargado] = useState(false);
    const [selfil, setFil] = useState(1);
    const [selcant, setCant] = useState(5);
    let fil = useRef(null);
    let cant = useRef(null);

    const cambiarCant = () => {
        setCant(cant.current.value);
    }
    const cambiarFil = () => {
        setFil(fil.current.value);
    }

    const Ordenar = () => {
        if (selfil === 1) {
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
        else {
            lista.sort(function (a, b) {
                if (a.TimeCpu > b.TiempoCpu) {
                    return 1;
                }
                if (a.TiempoCpu < b.TiempoCpu) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
        }

    }


    useEffect(() => {
        listaProc()
    }, []);

    const listaProc = () => {
        fetch('http://localhost/php/Procesos.php')
            .then((res) => res.json())
            .then((json) => {
                var i = 0
                while (i < 131) {
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
            <div className="selectores">
                <label>Cantodad a Mostrar</label>
                <input type="number" defaultValue={5} ref={cant} onChange={cambiarCant}></input>
                <label>Filtrar Por</label>
                <select id="filtro" ref={fil} onChange={cambiarFil}>
                    <option value={1}>Memoria</option>
                    <option value={2}>Tiempo CPU</option>
                </select>

            </div>
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
                                    i < selcant &&
                                    <tr key={i}>
                                        <td>{i + 1}</td>
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