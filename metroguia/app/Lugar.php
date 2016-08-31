<?php namespace AppMetroguia;

use Illuminate\Database\Eloquent\Model;

class Lugar extends Model {

	protected $table = "lugar";

	public function coordenadaslugares(){
		return $this->hasMany('AppMetroguia\CoordenadasLugares');
	}

	public function ObtenerTodos(){
		return self::all();
	}

}
