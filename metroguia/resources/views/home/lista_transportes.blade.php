<ul>
	@foreach($transportes as $row)
    <li id="buttontoggle_<?= $row->id; ?>" class="btnToggleMetro" onclick="MostrarRutas(<?= $row->id; ?>,'<?= $row->icon_principal; ?>','<?= $row->ico_check; ?>','<?= $row->mostrar_inicio; ?>')">
    	<img id="img_<?= $row->id; ?>" src="<?= $row->icon_principal ?>" align="center">
    	<span id="metrotxt"><?= $row->punto_origen." - ".$row->punto_destino; ?></span>
    </li>
    @endforeach
</ul>
<hr/>
<div id="contenedorAlimentadores" >
	<ul id="dependencias_transporte">
		<!--AQUI SE VAN A CARGAR TODAS LAS SUBLINEAS DE TRANSPORTE(ALIMENTADORES, OTRO TIPO DE BUS, ETC)-->
	</ul>
	<div id="content-force-overflow" ></div>
</div>