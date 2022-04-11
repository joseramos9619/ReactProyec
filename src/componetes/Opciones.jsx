import { StrictMode } from "react/cjs/react.production.min";

function Opciones(props) {
  return (
    <StrictMode>
      <div className="opciones">
        <div>
          <labe>Cantidad a Mostrar: </labe>
          <input
            type="number"
            defaultValue={5}
            ref={props.cant}
            min={1}
            max={131}
            onChange={props.opteCant}
          ></input>
        </div>
        <div>
          <labe>Filtrar Por: </labe>
          <select ref={props.fil} onChange={props.opteFil} onClick={props.ordTabla}>
            <option value={1}>Memoria</option>
            <option value={2}>Tiempo CPU</option>
          </select>
        </div>
      </div>
    </StrictMode>
  );
}
export default Opciones;
