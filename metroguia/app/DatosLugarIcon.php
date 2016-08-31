<?php namespace AppMetroguia;

use Illuminate\Database\Eloquent\Model;

class DatosLugarIcon extends Model {

	protected $table = 'datos_lugar_icon';

	public function transporte(){
		return  $this->belongsTo('AppMetroguia\CoordenadasLugares');
	}

	public function getDetalleLugar($id){
		$query_datos_lugar_icon = self::where('id_coordenada_lugar','=',$id)->get();
		$arr_datos_lugar_icon = array(); $i=0;
		foreach($query_datos_lugar_icon as $data){
			$arr_datos_lugar_icon[$i]=array(
											"id"=>$data->id,
											"icon"=>$data->icon,
											"descripcion_info"=>$data->descripcion_info
											);
			$i++;
		}
		return json_encode($arr_datos_lugar_icon);
	}

}
