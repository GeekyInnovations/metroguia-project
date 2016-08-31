<?php namespace AppMetroguia;

use Illuminate\Database\Eloquent\Model;

class CoordenadasLugares extends Model {

	protected $table = 'coordenadas_lugares';

	public function lugar(){
		return  $this->belongsTo('AppMetroguia\Lugar');
	}

	public function datoslugaricon(){
		return $this->hasMany('AppMetroguia\DatosLugarIcon');
	}

	public function getCollectionsLugares($id){
		$query_coordenadas_lugares = self::where('id_lugar','=',$id)->get();
		$arr_coordenadas_lugares = array(); $i=0;
		foreach($query_coordenadas_lugares as $data){
			$arr_coordenadas_lugares[$i]=array(
											   "id"=>$data->id,
											   "nom_lugar"=>$data->nom_lugar,
											   "icon_lugar"=>$data->icon_lugar,
											   "lat"=>$data->lat,
											   "lng"=>$data->lng
											   );
			$i++;
		}
		return json_encode($arr_coordenadas_lugares);
	}

}
