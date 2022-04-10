<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: text/html; charset=utf-8");
$cmd='TASKLIST /v /fo csv /nh';
exec($cmd,$output);

$arreglo = array();
foreach ($output as $line) {  // ///////ciclo para poder mostrar los datos de los procesos 
    $linea = explode(',', $line);
    
    ////cragamos toda la salida del cmd en un arreglo multidimencinal
    $arreglo[] = array(
        'nombre' => str_replace('"', '', $linea[0]),
        'pid' => str_replace('"', '', $linea[1]),
        "sesionnom" => str_replace('"', '', $linea[2]),
        "sesionnum" => str_replace('"', '', $linea[3]),
        "memoria" => str_replace('"', '', str_replace(' KB', '', $linea[4])),
        "estado" => str_replace('"', '', $linea[5]),
        "usuarionom" => str_replace('"', '', $linea[6]),
        "cpu" => str_replace('"', '', $linea[7]),
        "ventana" => str_replace('"', '', $linea[8]),
    );
}

json_encode($arreglo);

var_dump($arreglo);
?>