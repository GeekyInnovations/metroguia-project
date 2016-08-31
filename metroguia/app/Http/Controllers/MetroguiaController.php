<?php namespace AppMetroguia\Http\Controllers;

use Illuminate\Http\Request;//LIBRERIA IMPORTANTISIMA PARA TRABAJAR CON LOS (REQUEST)

class MetroguiaController extends Controller
{

    /**
     * PAGE: index
     * This method handles what happens when you move to http://yourproject/home/index (which is the default page btw)
     */
    public function index()
    {   
        $sistema_transporte= new \AppMetroguia\SistemaTransporte;
        $lugares = new \AppMetroguia\Lugar;
        $data_sistema=$sistema_transporte->TraerTodos();
        $data_lugar=$lugares->ObtenerTodos();
        return view('home.index',['sistemas'=>$data_sistema,'lugares'=>$data_lugar]);
    }

    //funcion que cargara los transportes existentes dependiendo del sistema elegido
    public function listaTransportes(Request $request){
        $transporte_model= new \AppMetroguia\Transporte;
        $transportes=$transporte_model->getTransportes($request->id_sistema_transporte);
        return view('home.lista_transportes',['transportes'=>$transportes]);
    }

    public function listaSubtransportes(Request $request){
        $transporte_model= new \AppMetroguia\Transporte;
        $subtransportes=$transporte_model->getSubTransportes($request->id_transporte);
        return view('home.lista_subtransportes',['subtransportes'=>$subtransportes]);
    }

    public function mostrarPuntos(Request $request){
        $icon_ubicacion= new \AppMetroguia\IconUbicacion;
        return $icon_ubicacion->getPuntosRutasTransporte($request->id_transporte);
    }

    public function dibujoLineasTransporte(Request $request){
        $transporte_model= new \AppMetroguia\Transporte;
        return $transporte_model->getLineasRutasTransporteCoordenadas($request->id_transporte);
    }


}