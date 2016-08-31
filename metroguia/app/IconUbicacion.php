<?php namespace AppMetroguia;

use Illuminate\Database\Eloquent\Model;

class IconUbicacion extends Model {

	protected $table = 'icon_ubicacion';

	public function transporte(){
		return  $this->belongsTo('AppMetroguia\Transporte');
	}
	
	public function getPuntosRutasTransporte($id_transporte){
		$query_puntos_transporte = self::select('lat', 'lng', 'icon', 'nombre AS nom')
									   ->where('id_transporte','=',$id_transporte)
									   ->get();
		$arr_puntos_ruta =array(); $i=0;
		foreach($query_puntos_transporte as $data){
			$arr_puntos_ruta[$i]=array("lat"=>$data->lat,
									   "lng"=>$data->lng,
									   'icon'=>$data->icon,
									   "nom"=>$data->nom);
			$i++;
		}
		return json_encode($arr_puntos_ruta);
	}

	
}