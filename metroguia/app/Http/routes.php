<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
| (get,post,pull,delete)
*/

Route::get('/', 'MetroguiaController@index');//controlador base a iniciar, contiene toda la aplicacion

Route::post('transportesAjax','MetroguiaController@listaTransportes');//por ajax carga ruta y obtener datos

Route::post('puntosAjax','MetroguiaController@mostrarPuntos');

Route::post('lineasAjax','MetroguiaController@dibujoLineasTransporte');

Route::post('subtransportesAjax','MetroguiaController@listaSubtransportes');

Route::post('puntoslugaresAjax','LugarController@mostrarCoordenadasIconsLugares');

Route::post('detalleslugarAjax','LugarController@cargarDetallesIconsLugares');

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
