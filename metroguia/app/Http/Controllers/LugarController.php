<?php namespace AppMetroguia\Http\Controllers;

use Illuminate\Http\Request;//LIBRERIA IMPORTANTISIMA PARA TRABAJAR CON LOS (REQUEST)

class LugarController extends Controller
{

    //mostrara todos los lugares de atraccion dependiendo del tipo del lugar seleccionado
    public function mostrarCoordenadasIconsLugares(Request $request)
    {   
        $coordenada_lugar_model = new \AppMetroguia\CoordenadasLugares;
        return $coordenada_lugar_model->getCollectionsLugares($request->id_lugar);
    }


    public function cargarDetallesIconsLugares(Request $request){
        $datos_lugar_icon_model = new \AppMetroguia\DatosLugarIcon;
        return $datos_lugar_icon_model->getDetalleLugar($request->id_coordenada_lugar);
    }
    
}
?>