import { Component } from "react/cjs/react.production.min";
import {spawn} from "child_process"

class Tabla extends Component {
    state = {
        numpro: 1,
        filtro: 'cpu'
    }
  
    render() {
        var linea;
        let salida = spawn('cmd', ['/c', 'TASKLIST /v /fo csv /nh']);
        salida.stdout.on('data', (data) => {
            linea = Array(data.split(','));
        })
        console.log(linea)

        return (
            <table>

                <tbody>

                </tbody>
            </table>
        );
    }
}

export default Tabla;