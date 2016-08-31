@foreach($subtransportes as $row)
<li id="buttontoggle_<?= $row->id; ?>" class="btnToggleAlimentadores" onclick="MostrarRutasAlimentadores(<?= $row->id; ?>,'<?= $row->icon_principal ?>','<?= $row->ico_check ?>','<?= $row->mostrar_inicio ?>')">
	<div class="listado_<?= $row->id_transporte; ?>" >
		<div class="info_alim" >
			<img id="img_<?= $row->id; ?>" src="<?= $row->icon_principal ?>" align="center">
				<span ><?= $row->punto_origen.", ".$row->punto_destino; ?></span>
				<p ><?= $row->descripcion; ?></p>
		</div>
	</div>
</li>
@endforeach