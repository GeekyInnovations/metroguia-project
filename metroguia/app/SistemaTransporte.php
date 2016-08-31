<?php namespace AppMetroguia;

use Illuminate\Database\Eloquent\Model;

class SistemaTransporte extends Model {

	protected $table = 'sistema_transporte';

	public function transporte(){
		return $this->hasMany('AppMetroguia\Transporte');
		//un sistema tiene muchos transportes
	}


	public function TraerTodos(){
		return self::all();
	}

}
