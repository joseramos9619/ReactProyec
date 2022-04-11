import { StrictMode } from "react/cjs/react.production.min";

function Tabla(props) {
  return (
    <StrictMode>
      {
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>PID</th>
            <th>Usuario</th>
            <th>Descriccion</th>
            <th>Memoria</th>
            <th>Tiempo CPU</th>
          </tr>
          </thead>
          <tbody>
            {props.lista.map(
              (iten, i) =>
                i < props.cant && (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{iten.nombre}</td>
                    <td>{iten.PID}</td>
                    <td>{iten.User}</td>
                    <td>{iten.Estado}</td>
                    <td>{iten.Memoria} KB</td>
                    <td>{iten.TimeCpu}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      }
    </StrictMode>
  );
}

export default Tabla;
