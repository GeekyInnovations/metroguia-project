<?php namespace AppMetroguia;

use Illuminate\Database\Eloquent\Model;

class Transporte extends Model {

	protected $table = "transporte";
	/*SECCION DE RELACIONES*/
	public function sistematransporte(){
		return $this->belongsTo('AppMetroguia\SistemaTransporte');
		//el transporte pertenece a un solo sistema de transporte
	}

	public function iconubicacion(){
		return $this->hasMany('AppMetroguia\IconUbicacion');
		//el transporte posee una coleccion de iconos
	}

	//relacion espcial muchos a muchos por la tabla intermedia llamada "ruta"
	public function coordenadas(){
		return $this->belongsToMany('AppMetroguia\Coordenada','ruta','id_transporte','id_coordenada');
	}

	public function getLineasRutasTransporteCoordenadas($id){
		$JSONtransporte = self::find($id)->toJson();
		$transporte = json_decode($JSONtransporte);
		$ruta=array();
		$i=0;
		$JSONcoordenadas = self::find($id)->coordenadas->toJson();
		$coordenadas = json_decode($JSONcoordenadas);
		foreach($coordenadas as $coordenada)
		{
			$ruta[$i]=array(
							'lat'=>$coordenada->lat,
							'lng'=>$coordenada->lng,
							'hex_color'=>$transporte->hex_color
						   );
			$i++;
		}
		return json_encode($ruta);
	}


	public function getSubTransportes($id){
		return self::distinct()->where('id_transporte',"=", $id)->get();
	}

	public function getTransportes($id){
		return self::where('id_sistema_transporte',"=",$id)
				   ->whereNull("id_transporte")->get();
	}
}
