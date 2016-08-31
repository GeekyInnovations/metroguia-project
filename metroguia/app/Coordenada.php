<?php namespace AppMetroguia;

use Illuminate\Database\Eloquent\Model;

class Coordenada extends Model {

	protected $table = 'coordenada';

	//relacion espcial muchos a muchos por la tabla intermedia llamada "ruta"
	public function transportes(){
		return $this->belongsToMany('AppMetroguia\Transporte','ruta','id_coordenada','id_transporte');
		//esta pertenece a varias rutas
	}

}